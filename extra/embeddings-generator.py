# This is a python script that you can use to run the model locally and go through each of the movie plots to generate the imbeddings

# you will need to install sentence_transformers
# more details about the libarary can be found here - https://pypi.org/project/sentence-transformers/
from sentence_transformers import SentenceTransformer
import json

# we'll use the sentence-transformers named "all-mpnet-base-v2", however you can select another one as well
model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')

def add_embeddings(movie_plots):
    for idx, movie_plot in enumerate(movie_plots):
        embedding = model.encode(movie_plot['plot'])
        movie_plot['embedding'] = embedding.tolist()
        print(f"Processing movie_plot {idx + 1}/{len(movie_plots)}")

def save_to_json(data, file_path):
    with open(file_path, 'w') as json_file:
        json.dump(data, json_file)

# Read wine data from the JSON file
input_file = 'movie_plots.json'
with open(input_file, 'r') as json_file:
    movie_plots = json.load(json_file)

# To test that all works you can start by limiting the loop to just first 3 items
# movie_plots = movie_plots[:3]

# Add embeddings for "plot" field
add_embeddings(movie_plots)

# Save the updated movie data to a new JSON file
output_file = 'movie_plots_with_embeddings.json'
save_to_json(movie_plots, output_file)

print("Embeddings added and data saved to:", output_file)

