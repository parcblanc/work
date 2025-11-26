import Papa from 'papaparse';

const SPREADSHEET_ID = '1UO22G1mcDkF_G56sp5PEqNznQZNAwm-DHLxR8XQoh3U';
const SHEET_ID = '1214302108';

export const loadVocabularyData = async () => {
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;

    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error('스프레드시트를 불러올 수 없습니다. 공개 설정을 확인해주세요.');
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const vocabulary = results.data
            .filter(row => row.length >= 2 && row[0] && row[1])
            .map(row => ({
              english: row[0].trim(),
              korean: row[1].trim()
            }));

          if (vocabulary.length === 0) {
            reject(new Error('데이터가 비어있습니다.'));
          } else {
            resolve(vocabulary);
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('데이터 로딩 오류:', error);
    throw error;
  }
};

export const getRandomQuestions = (vocabulary, count = 10) => {
  const shuffled = [...vocabulary].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, vocabulary.length));

  return selected.map(word => {
    const isEnglishToKorean = Math.random() < 0.5;
    return {
      question: isEnglishToKorean ? word.english : word.korean,
      answer: isEnglishToKorean ? word.korean : word.english,
      type: isEnglishToKorean ? 'en-ko' : 'ko-en'
    };
  });
};
