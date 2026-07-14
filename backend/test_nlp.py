import os
import nltk

print("Initializing local NLTK datasets...")
try:
    nltk.download('punkt', quiet=True)
    nltk.download('punkt_tab', quiet=True)
    nltk.download('stopwords', quiet=True)
    print("NLTK datasets verified and loaded successfully.")
except Exception as e:
    print(f"Warning: Failed to download NLTK data: {e}")

try:
    from nlp_engine import generate_summary, extract_keywords, document_qa
    
    sample_text = (
        "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines "
        "that are programmed to think like humans and mimic their actions. The term may also be "
        "applied to any machine that exhibits traits associated with a human mind such as learning "
        "and problem-solving. Machine learning is a subset of artificial intelligence. It focuses "
        "on teaching computers how to learn from data to improve their accuracy over time without "
        "being explicitly programmed to do so. In supervised learning, the algorithm is trained "
        "on a labeled dataset, which means that each training example is paired with an output label."
    )
    
    print("\n--- Running NLP diagnostics ---")
    
    # 1. Test Summary
    summary = generate_summary(sample_text, sentences_count=2)
    print(f"Generated Summary: {summary}")
    
    # 2. Test Keywords
    keywords = extract_keywords(sample_text, top_n=3)
    print(f"Extracted Keywords: {keywords}")
    
    # 3. Test Q&A Search
    qa_ans = document_qa(sample_text, "What is supervised learning?")
    print(f"Q&A Search Result for 'supervised learning': {qa_ans}")
    
    print("\nAll backend NLP functionalities are verified and operational!")
    
except Exception as e:
    print(f"\nError: Verification failed: {e}")
    import traceback
    traceback.print_exc()
