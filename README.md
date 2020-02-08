
ChEMBL Heatmap
==============================

What Is This?
-------------

This is a simple Python/Flask application intended to extract data from the ChEMBL database and plots a heatmap visualisation.

Prerequisites
---------------
- Docker
- Python 3.7

How To Use This
---------------

1. Build the image using the following command: `docker build --no-cache -t chembl:latest .`
2. Run the Docker container using command: `docker run -d -p 5009:5009 chembl`
3. Navigate to http://localhost:5009 in your browser

![Heatmap](https://i.imgur.com/HjY4lI7.png "CHEMBL-Heatmap")

