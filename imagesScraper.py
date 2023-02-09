import os
import requests
from bs4 import BeautifulSoup

# Make an HTTP request to the website and retrieve the HTML content
url = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/"
response = requests.get(url)
html_content = response.text

# Parse the HTML content to extract the URLs of all the images on the page
soup = BeautifulSoup(html_content, "html.parser")
img_tags = soup.find_all("img")
urls = [img["src"] for img in img_tags if '/' not in img["src"] and '.png' in img["src"]]

# Create a directory to store the images
if not os.path.exists("images"):
    os.makedirs("images")

# Download each image using the URL
for url in urls:
    response = requests.get(url)
    if response.status_code == 200:
        print("not blocked")
        with open("images/" + os.path.basename(url), "wb") as f:
            f.write(response.content)
    else:
        print("Failed to download image. HTTP status code:", response.status_code)


exec(open('file.py').read())