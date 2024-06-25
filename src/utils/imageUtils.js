export function resizeImage(file, maxWidth, maxHeight, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      // Зменшуємо розмір до ширини не більше maxWidth і висоти не більше maxHeight
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      // Встановлюємо розмір canvas
      canvas.width = width;
      canvas.height = height;

      // Вставляємо фото у canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Отримуємо base64 представлення зменшеної фотографії
      const base64Data = canvas.toDataURL("image/jpeg");

      // Викликаємо колбек з обробленою фотографією
      callback(base64Data);
    };

    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
