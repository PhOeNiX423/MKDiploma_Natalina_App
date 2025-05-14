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
    <div className="text-primary font-primary space-y-16 py-8">
      {/* Заголовок страницы */}
      <div className="text-center">
        <h1 className="font-mbrody text-3xl md:text-5xl font-semibold text-pinkaccent mb-4">
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
          {/* Одно видео */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="aspect-video">
              <video className="w-full h-full object-cover block" controls>
                <source src="/images/videos/video_1.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                Нейтральный макияж для любого случая
              </h3>
              <p className="text-secondary text-sm mt-2">
                Минималистичный и утончённый образ — с этим макияжем вы будете
                выглядеть стильно каждый день. Идеально подойдёт для офиса,
                встреч или прогулки.
              </p>
            </div>
          </div>

          {/* Одно видео */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="aspect-video">
              <video className="w-full h-full object-cover block" controls>
                <source src="/images/videos/video_2.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                Ягодный макияж с акцентом на губы
              </h3>
              <p className="text-secondary text-sm mt-2">
                Осенний макияж в ягодных тонах, который подчеркнёт вашу
                индивидуальность. Следуйте за визажистом Mary Kay и создайте
                образ с выразительными губами и тёплым румянцем.
              </p>
            </div>
          </div>

          {/* Одно видео */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="aspect-video">
              <video className="w-full h-full object-cover block" controls>
                <source src="/images/videos/video_3.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                Лёгкий макияж на каждый день
              </h3>
              <p className="text-secondary text-sm mt-2">
                Освежающий и быстрый повседневный макияж, подходящий для селфи,
                офиса или прогулки. Узнайте, как легко создать мягкий образ
                всего за пару минут!
              </p>
            </div>
          </div>
          {/* Можно добавить больше видео по аналогии */}
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
              href="/article"
              className="text-pinkaccent mt-2 inline-block"
            >
              Читать далее →
            </a>
          </article>

          {/* Одна статья */}
          <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
              5 шагов к сияющей коже
            </h3>
            <p className="text-secondary line-clamp-3">
              Узнайте, как правильно очищать, тонизировать и увлажнять кожу, чтобы она выглядела свежей и ухоженной каждый день.
            </p>
            <a
              href="/article"
              className="text-pinkaccent mt-2 inline-block"
            >
              Читать далее →
            </a>
          </article>

          {/* Можно добавить больше блоков по аналогии */}
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
