export interface ChatEmotionLog {
  text: string,
  timestamps: { date: string, time: string },
  emotion: string
};

export interface ChatEmotions {
  happy: ChatEmotionLog[],
  sad: ChatEmotionLog[],
  angry: ChatEmotionLog[],
  fear: ChatEmotionLog[]
};