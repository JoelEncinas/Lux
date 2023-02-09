import requests
import os
from bs4 import BeautifulSoup

# Make an HTTP request to the website and retrieve the HTML content
url = "https://example.com"
response = requests.get(url)
html_content = response.text

# Parse the HTML content to extract the URLs of all the images on the page
soup = BeautifulSoup(html_content, "html.parser")
img_tags = soup.find_all("img")
urls = [img["src"] for img in img_tags]

# Create a directory to store the images
if not os.path.exists("images"):
    os.makedirs("images")

# Download each image using the URL
for url in urls:
    response = requests.get(url)
    with open("images/" + os.path.basename(url), "wb") as f:
        f.write(response.content)

