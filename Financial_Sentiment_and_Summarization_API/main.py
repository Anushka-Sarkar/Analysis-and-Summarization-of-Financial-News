import os
os.environ["HF_HOME"] = "/tmp/huggingface"
os.environ["TRANSFORMERS_CACHE"] = "/tmp/huggingface/transformers"

from fastapi import FastAPI
from pydantic import BaseModel
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    pipeline
)
from newspaper import Article
import torch

app = FastAPI()

# Load sentiment model
sentiment_model_name = "mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis"
sentiment_tokenizer = AutoTokenizer.from_pretrained(sentiment_model_name)
sentiment_model = AutoModelForSequenceClassification.from_pretrained(sentiment_model_name)

# Load summarizer
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Sentiment class mapping
sentiment_mapping = {0: 'Negative', 1: 'Neutral', 2: 'Positive'}

# Input schema
class InputData(BaseModel):
    text: str = None
    url: str = None

@app.get("/")
def home():
    return {"message": "Financial Sentiment & Summary API is running."}

@app.post("/predict")
async def predict_sentiment(data: InputData):
    if data.text:
        input_text = data.text
    elif data.url:
        try:
            article = Article(data.url)
            article.download()
            article.parse()
            input_text = article.title
        except Exception as e:
            return {"error": f"Failed to extract headline from URL: {str(e)}"}
    else:
        return {"error": "Provide either 'text' or 'url' in the request."}

    # Tokenize and predict
    inputs = sentiment_tokenizer(input_text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = sentiment_model(**inputs)

    logits = outputs.logits
    probs = torch.softmax(logits, dim=1)[0].tolist()
    sentiment_class = logits.argmax(dim=1).item()
    confidence = probs[sentiment_class]

    threshold = 0.5
    if confidence < threshold:
        return {
            "input": input_text,
            "sentiment": "Low confidence prediction",
            "confidence": confidence,
            "confidence_scores": {
                "Negative": probs[0],
                "Neutral": probs[1],
                "Positive": probs[2]
            }
        }

    return {
        "input": input_text,
        "sentiment": sentiment_mapping.get(sentiment_class, "Unknown"),
        "confidence": confidence,
        "confidence_scores": {
            "Negative": probs[0],
            "Neutral": probs[1],
            "Positive": probs[2]
        }
    }

@app.post("/summarize")
async def summarize_article(data: InputData):
    if data.text:
        content = data.text
    elif data.url:
        try:
            article = Article(data.url)
            article.download()
            article.parse()
            content = article.text
        except Exception as e:
            return {"error": f"Failed to extract article text: {str(e)}"}
    else:
        return {"error": "Provide either 'text' or 'url' in the request."}

    # Hugging Face summarizer
    try:
        summary = summarizer(content, max_length=120, min_length=30, do_sample=False)[0]['summary_text']
        return {
            "summary": summary
        }
    except Exception as e:
        return {"error": f"Summarization failed: {str(e)}"}