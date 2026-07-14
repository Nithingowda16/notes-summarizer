import re
import math
import os
import PyPDF2

# Standard english stop words for local fallbacks and QA preprocessing
STOP_WORDS = set([
    "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "of", "to", "in", 
    "for", "with", "on", "at", "by", "this", "that", "it", "its", "from", "as", "be", 
    "has", "have", "not", "he", "she", "they", "we", "i", "you", "me", "him", "her", 
    "them", "us", "my", "your", "his", "their", "will", "would", "shall", "should",
    "can", "could", "may", "might", "must", "about", "about", "above", "after", "again", 
    "against", "all", "am", "any", "are", "arent", "as", "at", "be", "because", "been", 
    "before", "being", "below", "between", "both", "but", "by", "cant", "cannot", "co", 
    "con", "could", "couldnt", "did", "didnt", "do", "does", "doesnt", "doing", "dont", 
    "down", "during", "each", "few", "for", "from", "further", "had", "hadnt", "has", 
    "hasnt", "have", "havent", "having", "he", "hed", "hell", "hes", "her", "here", 
    "heres", "hers", "herself", "him", "himself", "his", "how", "hows", "i", "id", 
    "ill", "im", "ive", "if", "in", "into", "is", "isnt", "it", "its", "itself", "lets", 
    "me", "more", "most", "mustnt", "my", "myself", "no", "nor", "not", "of", "off", 
    "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", 
    "over", "own", "same", "shant", "she", "shed", "shell", "shes", "should", "shouldnt", 
    "so", "some", "such", "than", "that", "thats", "the", "their", "theirs", "them", 
    "themselves", "then", "there", "theres", "these", "they", "theyd", "theyll", 
    "theyre", "theyve", "this", "those", "through", "to", "too", "under", "until", 
    "up", "very", "was", "wasnt", "we", "wed", "well", "were", "weve", "werent", 
    "what", "whats", "when", "whens", "where", "wheres", "which", "while", "who", 
    "whos", "whom", "why", "whys", "with", "wont", "would", "wouldnt", "you", "youd", 
    "youll", "youre", "youve", "your", "yours", "yourself", "yourselves"
])

def extract_text_from_pdf(file_path):
    """Extracts raw text from the specified PDF file path."""
    text = ""
    with open(file_path, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def calculate_analytics(text, file_path=None):
    """Calculates document metrics: words, characters, pages, reading time."""
    pages = 1
    if file_path:
        try:
            with open(file_path, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                pages = len(reader.pages)
        except Exception:
            pass
            
    # Normalize whitespace and strip
    clean_text = re.sub(r'\s+', ' ', text).strip()
    
    # Word count
    words = len(re.findall(r'\b\w+\b', clean_text))
    
    # Character count
    characters = len(text)
    
    # Reading time (average 200 words per minute)
    reading_time = max(1, round(words / 200))
    
    return {
        "pages": pages,
        "words": words,
        "characters": characters,
        "reading_time_minutes": reading_time
    }

def fallback_summary(text, sentences_count=5):
    """Extractive summarization using raw term frequency (pure-Python fallback)."""
    # Split text into sentences
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    sentences = [s.strip() for s in sentences if len(s.strip()) > 10]
    
    if len(sentences) <= sentences_count:
        return " ".join(sentences)
        
    # Get word frequencies
    words = re.findall(r'\b\w+\b', text.lower())
    word_freqs = {}
    for word in words:
        if len(word) > 2 and word not in STOP_WORDS:
            word_freqs[word] = word_freqs.get(word, 0) + 1
            
    # Score sentences based on word frequencies
    sentence_scores = {}
    for i, sentence in enumerate(sentences):
        score = 0
        sentence_words = re.findall(r'\b\w+\b', sentence.lower())
        if not sentence_words:
            continue
        for word in sentence_words:
            score += word_freqs.get(word, 0)
        # Normalize score by word count to avoid bias toward long sentences
        sentence_scores[i] = score / max(1, len(sentence_words))
        
    # Pick top N scoring sentences and arrange chronologically
    top_indices = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:sentences_count]
    top_indices.sort()
    
    return " ".join([sentences[i] for i in top_indices])

def generate_summary(text, sentences_count=5):
    """Generates an extractive summary using Sumy (or falls back to frequency extraction)."""
    if not text.strip():
        return ""
        
    try:
        from sumy.parsers.plaintext import PlaintextParser
        from sumy.nlp.tokenizers import Tokenizer
        from sumy.summarizers.lsa import LsaSummarizer
        
        parser = PlaintextParser.from_string(text, Tokenizer("english"))
        summarizer = LsaSummarizer()
        summary_sentences = summarizer(parser.document, sentences_count)
        
        summary = " ".join([str(sentence) for sentence in summary_sentences])
        if summary.strip():
            return summary
        else:
            return fallback_summary(text, sentences_count)
    except Exception as e:
        print(f"Sumy error: {e}. Using pure-Python frequency fallback summarizer.")
        return fallback_summary(text, sentences_count)

def extract_keywords(text, top_n=8):
    """Extracts keywords using YAKE (or falls back to word frequency)."""
    if not text.strip():
        return []
        
    try:
        import yake
        kw_extractor = yake.KeywordExtractor(lan="en", n=2, dedupLim=0.9, top=top_n, features=None)
        keywords = kw_extractor.extract_keywords(text)
        # YAKE scores lower as more important, keywords is list of (keyword, score)
        return [kw[0].title() for kw in keywords]
    except Exception as e:
        print(f"YAKE error: {e}. Using word-frequency keyword extractor.")
        # Fallback keyword extraction
        words = re.findall(r'\b[a-zA-Z]{4,}\b', text.lower())
        word_freqs = {}
        for w in words:
            if w not in STOP_WORDS:
                word_freqs[w] = word_freqs.get(w, 0) + 1
        sorted_words = sorted(word_freqs.items(), key=lambda x: x[1], reverse=True)
        return [w[0].title() for w in sorted_words[:top_n]]

# TF-IDF Document Q&A Search Engine
def preprocess_text(text):
    """Tokenizes, lowercases, and filters out stopwords and non-alphanumeric chars."""
    words = re.findall(r'\b[a-z0-9]+\b', text.lower())
    return [w for w in words if w not in STOP_WORDS]

def document_qa(text, query):
    """Searches the document text for the best matching passage relative to the query using local TF-IDF."""
    if not text.strip() or not query.strip():
        return "Please upload a document and enter a question."

    # 1. Chunk the document. Try splitting by paragraphs first.
    paragraphs = re.split(r'\n\s*\n', text.strip())
    # If the text has no double newlines, group sentences into chunks of 3
    if len(paragraphs) <= 2 or all(len(p.strip()) < 100 for p in paragraphs):
        sentences = re.split(r'(?<=[.!?])\s+', text.strip())
        paragraphs = []
        chunk_size = 3
        for i in range(0, len(sentences), chunk_size):
            chunk = " ".join(sentences[i:i+chunk_size]).strip()
            if len(chunk) > 20:
                paragraphs.append(chunk)

    # Clean up empty paragraphs
    paragraphs = [p.strip() for p in paragraphs if len(p.strip()) > 15]
    if not paragraphs:
        return "The document does not contain enough searchable text."

    # 2. Tokenize documents
    tokenized_docs = [preprocess_text(p) for p in paragraphs]
    tokenized_query = preprocess_text(query)
    
    if not tokenized_query:
        return "I couldn't identify any searchable terms in your question. Try using different keywords."

    # 3. Compute IDF for all terms in the vocabulary
    all_terms = set(tokenized_query) # We only care about terms in the query to save computation
    doc_frequencies = {}
    for term in all_terms:
        doc_frequencies[term] = sum(1 for doc in tokenized_docs if term in doc)

    num_docs = len(paragraphs)
    idfs = {}
    for term in all_terms:
        # standard smoothing
        df = doc_frequencies[term]
        idfs[term] = math.log(1 + (num_docs / (1 + df)))

    # 4. Vectorize query
    query_tf = {}
    for term in tokenized_query:
        query_tf[term] = query_tf.get(term, 0) + 1
    
    query_vector = {}
    query_norm_sq = 0.0
    for term in tokenized_query:
        tf = query_tf[term] / len(tokenized_query)
        tfidf = tf * idfs[term]
        query_vector[term] = tfidf
        query_norm_sq += tfidf ** 2
    query_norm = math.sqrt(query_norm_sq)

    if query_norm == 0:
        return "I couldn't find any direct reference to that in the document. Could you try rephrasing or asking something else?"

    # 5. Score each paragraph based on Cosine Similarity
    best_score = -1.0
    best_index = -1
    
    for doc_idx, doc in enumerate(tokenized_docs):
        if not doc:
            continue
            
        doc_tf = {}
        for term in doc:
            if term in all_terms:
                doc_tf[term] = doc_tf.get(term, 0) + 1
                
        doc_vector = {}
        doc_norm_sq = 0.0
        # For document norm, we need to compute full tfidf or approximate
        # For simplicity and speed, we can compute norms using query vocabulary only
        # or calculate full document length normalization
        for term in set(doc):
            term_idf = idfs.get(term, 0) if term in all_terms else math.log(1 + num_docs)
            tf = doc_tf.get(term, 0) / len(doc)
            tfidf = tf * term_idf
            doc_norm_sq += tfidf ** 2
            if term in all_terms:
                doc_vector[term] = tfidf
                
        doc_norm = math.sqrt(doc_norm_sq)
        if doc_norm == 0:
            continue
            
        # Dot product
        dot_product = 0.0
        for term in tokenized_query:
            dot_product += query_vector.get(term, 0.0) * doc_vector.get(term, 0.0)
            
        cosine_sim = dot_product / (query_norm * doc_norm)
        
        # Give a small boost for matching multiple unique query terms
        unique_matches = sum(1 for term in set(tokenized_query) if term in doc)
        match_ratio = unique_matches / len(set(tokenized_query))
        cosine_sim += 0.1 * match_ratio # soft boost
        
        if cosine_sim > best_score:
            best_score = cosine_sim
            best_index = doc_idx

    # 6. Return response
    if best_index != -1 and best_score > 0.02:
        return paragraphs[best_index]
    else:
        return "I scanned the document but couldn't find a strong match for your question. Could you try asking in a different way or referencing a specific keyword?"
