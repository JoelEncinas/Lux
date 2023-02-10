import os
import requests
from bs4 import BeautifulSoup

# Make an HTTP request to the website and retrieve the HTML content
url = "https://github.com/JoelEncinas/arcade-skate"
response = requests.get(url)
html_content = response.text

# Parse the HTML content to extract the URLs of all the images on the page
soup = BeautifulSoup(html_content, "html.parser")
img_tags = soup.find_all("img")
urls = [img["src"] for img in img_tags if '.png' in img["src"]]

for img in urls:
  print(img)

# Create a directory to store the images
if not os.path.exists("images"):
  os.makedirs("images")

# Download each image using the URL
for url in urls:
  response = requests.get(url)
  if response.status_code == 200:
    print("not blocked")
