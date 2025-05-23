import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { LLM_CONFIG } from "./config";
import { BaseLanguageModelInput } from "@langchain/core/language_models/base";

class LLMHub {
  private embedding: GoogleGenerativeAIEmbeddings;
  private chatModel: ChatGoogleGenerativeAI;

  constructor() {
    switch (LLM_CONFIG.company) {
      case "google":
        this.embedding = new GoogleGenerativeAIEmbeddings({
          apiKey: process.env.GEMINI_API_KEY,
          modelName: LLM_CONFIG.embeddingModel,
        });
        this.chatModel = new ChatGoogleGenerativeAI({
          apiKey: process.env.GEMINI_API_KEY,
          model: LLM_CONFIG.chatModel,
        });
        break;
      default:
        throw new Error("Unsupported LLM company");
    }
  }

  embedQuery(query: string) {
    console.log(query);

    return this.embedding.embedQuery(query);
  }

  invoke(messages: BaseLanguageModelInput) {
    return this.chatModel.invoke(messages);
  }
}

export default LLMHub;
