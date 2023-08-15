<p align="center">
<img src="assets/logo.png" alt="ThinkAi" style="display: block; margin: auto; background-color: transparent;">
</p>

# ThinkAi UI

[![Website](https://img.shields.io/badge/Website-Demo-20B2AA.svg)](https://thinkai.live)
[![Code License](https://img.shields.io/badge/Code%20License-MIT-red.svg)](https://github.com/OptimalScale/LMFlow/blob/main/LICENSE)
[![NextJS](https://img.shields.io/badge/NextJS-13.4+-black.svg)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-7cc5d9.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typeScript-007acc?logo=typescript&logoColor=white&style=flat)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-white?&logo=tailwind+css&logoColor=38bdf8&style=flat)](https://tailwindcss.com)

[ThinkAi](https://github.com/maanvithag/thinkai) is a Python-based LLM App trained on philosophy research that can answer questions on philosophy using Chroma's Vector Search, HuggingFace tokenizers for text chunking, Meta's `bart-large-cnn` model for summarizing, and OpenAI's `gpt-3.5-turbo` model for structuring the final response.

# Basic User Flow:
Here is how ThinkAi processes each user query;
* User pings the [web client](http://thinkai.live/) with a query.
* Chroma DB creates embeddings for this query
* Using vector search, Chroma DB pulls the closest top 3 articles for the query
* The summaries for these articles is pulled from the preprocessed `JSON` file from below and are combined by simple concatenation
* The combined text is included in prompt for `OpenAI GPT model`
* API call to OpenAI `gpt-3.5-turbo` model and get response
* Response is sent back to the user
<p align="center">
<img src="assets/userflow.png" alt="ThinkAi" style="display: block; margin: auto; background-color: transparent;">
</p>