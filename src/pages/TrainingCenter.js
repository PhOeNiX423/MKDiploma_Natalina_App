/**
 * TrainingCenter.js
 *
 * Страница обучающих материалов:
 * - Содержит видеокурсы, статьи и дополнительные ресурсы.
 * - Структурирована по логическим блокам.
 */

import React from "react";

const TrainingCenter = () => {
  return (
    <div className="text-primary font-primary space-y-16 py-10">
      {/* Заголовок страницы */}
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-semibold text-pinkaccent mb-4">
          Бьюти-школа
        </h1>
        <p className="text-pinksecondary text-lg">
          Учитесь легко — с подборкой статей и видеоуроков от экспертов
        </p>
      </div>

      {/* Видеоуроки */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-pinkaccent mb-6">
          Видеоуроки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Пример одного видео */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="aspect-video">
              <video className="w-full h-full object-cover block" controls>
                <source src="/videos/lesson1.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Как выбрать продукцию</h3>
              <p className="text-secondary text-sm mt-2">
                Краткое описание урока, полезные советы для новичков.
              </p>
            </div>
          </div>

          {/* Добавь больше блоков видео по аналогии */}
        </div>
      </section>

      {/* Статьи */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-pinkaccent mb-6">
          Обучающие статьи
        </h2>
        <div className="space-y-6">
          {/* Одна статья */}
          <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
              Секреты идеального макияжа
            </h3>
            <p className="text-secondary line-clamp-3">
              Узнайте, как правильно подбирать оттенки, наносить тон и создавать
              образ, который подчеркивает вашу индивидуальность.
            </p>
            <a
              href="/articles/makeup-secrets"
              className="text-pinkaccent mt-2 inline-block"
            >
              Читать далее →
            </a>
          </article>

          {/* Добавь больше блоков статей по аналогии */}
        </div>
      </section>

      {/* Дополнительно */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-pinkaccent mb-6">
          Дополнительно
        </h2>
        <ul className="list-disc list-inside text-secondary space-y-2">
          <li>
            <a
              href="/downloads/guide.pdf"
              className="text-pinkaccent hover:underline"
            >
              PDF-гид по продукции
            </a>
          </li>
          <li>
            <a
              href="/recommendations"
              className="text-pinkaccent hover:underline"
            >
              Рекомендации от экспертов
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TrainingCenter;
