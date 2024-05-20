import os
import requests
import random
from dotenv import load_dotenv


def get_quote_obj(categories: list) -> dict:
    """
    Get a quote object from Zen Quote APIs and return
    """
    
    try:
        load_dotenv("data/.env")
    except:
        pass

    category = random.choice(categories)
    api_key = os.environ.get("API_KEY")
    url = f"https://zenquotes.io/api/quotes/{api_key}&keyword={category}"
    response = requests.get(url, headers={"X-Api-Key": api_key})
    if response.status_code == requests.codes.ok:
        quote_response = response.json()
        if len(quote_response) > 0:
            return quote_response[0] | {"category": category}
        else:
            raise ValueError("Nothing is returned") 
    else:
        print("Error:", response.status_code, response.text)