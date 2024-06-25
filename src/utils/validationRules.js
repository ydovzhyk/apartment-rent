export const isRequired = (val) => ({
  hasPassed: !!val,
  message: "Будь ласка, заповніть це поле",
});

export const charLimit = (limit) => (val) => ({
  hasPassed: val.length <= limit,
  message: "Ви перевищили ліміт",
});

export const emailValidation = (val) => ({
  hasPassed: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val),
  message: "Невірна адреса пошти",
});

export const passwordValidation = (val) => ({
  hasPassed: /^(?=.*[A-Za-z])(?=.*[\d])[a-zA-Z0-9]{7,256}$/.test(val),
  message: "Пароль повинен містити одну цифру й один символ",
});

export const descrLimit = (limit) => (val) => ({
  hasPassed: val.length <= limit,
  message: "Ви перевищили ліміт",
});

export const titleLimit = (limit) => (val) => ({
  hasPassed: val.length <= limit,
  message: "Ви перевищили ліміт, можливо використати 300 символів",
});

export const minTextLimit = (limit) => (val) => ({
  hasPassed: val.length >= limit,
  message: `Вкажіть більше ніж ${limit} символ(а/ів)`,
});

export const phoneValidation = (val) => ({
  hasPassed: /^\+?[\d\s\-()]{10,15}$/.test(val),
  message: "Невірний номер телефону",
});

export const numberValidation = (val) => {
  const number = Number(val);
  return {
    hasPassed: !isNaN(number) && number >= 1 && number <= 20,
    message: "Число повинно бути від 1 до 20",
  };
};
