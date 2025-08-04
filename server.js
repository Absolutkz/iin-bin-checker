const express = require("express");
const app = express();
app.use(express.json());

// Простая функция валидации контрольной цифры по алгоритму ГОСТ РК (Luhn-like)
function validateIinBin(value) {
  if (!/^\d{12}$/.test(value) && !/^\d{12}$/.test(value)) return false;
  // Здесь можно вставить реальный алгоритм, для примера просто возвращаем true
  return true;
}

// Эндпоинт проверки IIN/BIN
app.get("/check-iin-bin", (req, res) => {
  const iin_bin = req.query.iin_bin;
  if (!iin_bin) {
    return res.status(400).json({ message: "iin_bin обязателен" });
  }
  const ok = validateIinBin(iin_bin);
  if (!ok) {
    return res.json({ isValid: false, type: "IIN/BIN", error: "Неверный формат" });
  }
  // Здесь можно добавить реальный запрос к гос-API
  return res.json({ isValid: true, type: iin_bin.length===12?"IIN":"BIN", error: null });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
