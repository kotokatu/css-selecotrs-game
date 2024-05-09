Link to deploy: [https://rolling-scopes-school.github.io/kotokatu-JSFE2023Q1/rs-css/]

# RS Селекторы

В этом задании мы создадим тренажер для изучения css-селекторов. Тренажер состоит из нескольких игровых уровней. Каждый уровень включает в себя пример вёрстки и html-код, который отвечает текущему уровню. Некоторые элементы вёрстки выделены при помощи анимации. Задача пользователя - написать css-селектор, отвечающий всем выделенным элементам вёрстки.

Прототип тренажера - приложение [CSS Diner](https://flukeout.github.io/), из которого необходимо воспроизвести только игровую часть. Перед началом выполнения задания внимательно ознакомьтесь с особенностями работы приложения-прототипа, это ускорит выполнение задания и облегчит понимание его требований.

## Структура приложения

- Блок 1. Пример вёрстки. На оригинальном сайте это стол с посудой и продуктами. Вы можете придумать и использовать свой вариант оформления.
- Блок 2. Окно для ввода кода пользователем.
- Блок 3. Код вёрстки. При наведении курсора на фрагмент кода, подсвечивается отвечающий этому фрагменту элемент вёрстки. При наведении курсора на элемент вёрстки, подсвечивается соответствующий ему фрагмент в блоке с кодом. В обоих перечисленных случаях рядом с элементом отображается его html-код
- Блок 4. Список уровней игры. На оригинальном сайте тридцать два уровня, вам достаточно выполнить десять-двадцать уровней. Большее количество уровней можно сделать по желанию и при наличии свободного времени.

## Ключевые навыки:

- **TypeScript**
- Modules
- Webpack

## Работа приложения

- в окне для ввода кода пользователь может напечатать и отправить на проверку css-селектор, который соответствует всем выделенным элементам вёрстки. Отправить код на проверку можно как кликом по кнопке Enter в окне для ввода кода, так и нажатием клавиши Enter на клавиатуре (оба варианта должны работать)
- для правильных и неправильных ответов предусмотрена соответствующая анимация. В оригинальном приложении при правильном ответе происходит вылет выделенных элементов за пределы экрана, при неправильном ответе - подёргивание окна с кодом. Вы можете использовать другую анимацию, на ваш взгляд более уместную и привлекательную
- при правильном ответе пользователь переходит на следующий уровень игры, или выводится уведомление о победе, если уровень последний
- в приложении есть кнопка Help для тех случаев, когда пользователь не может угадать нужный селектор. Клик по кнопке Help выводит нужный селектор в окне для ввода кода. Селектор выводится в блоке для ввода кода с эффектом печати текста (плавное появление текста по буквам)
- в блоке со списком уровней игры есть возможность переходить к определённому уровню кликая по его номеру; возле каждого уровня отображается, выполнен он, или нет, или уровень выполнен с использованием подсказки. Текущий уровень подсвечен. При перезагрузке приложение открывается на этом же уровне. Есть кнопка, позволяющая сбросить прогресс и начать прохождение игры заново

## Требования к оформлению приложения

- внешний вид приложения соответствует предложенному образцу или является его улучшенной версией
- для стандартных разрешений экрана монитора до 1024×768 включительно, приложение полностью помещается в экран без появления полосы прокрутки. При меньшем разрешении экрана может появиться вертикальная полоса прокрутки. Минимальная ширина страницы, при которой проверяется корректность отображения приложения - 500рх
- интерактивность элементов, с которыми пользователи могут взаимодействовать, изменение внешнего вида самого элемента и состояния курсора при наведении, использование разных стилей для активного и неактивного состояния элемента, плавные анимации
- в футере приложения есть ссылка на гитхаб автора, год создания приложения, [логотип курса](https://rs.school/images/rs_school_js.svg) со [ссылкой на курс](https://rs.school/js/)

## Технические требования

- для написания кода приложения используется TypeScript.
- код разбит на модули.
- для сборки кода используется `webpack`.
- используется `eslint`, настроенный для проверки TypeScript.
- работа приложения проверяется в браузере Google Chrome последней версии
- можно использовать [bootstrap](https://getbootstrap.com/), [material design](https://material.io/) и другие css-фреймворки, html и css пост/препроцессоры.
- запрещается использовать jQuery
- запрещается использовать Angular/React/Vue и/или подобные им фреймворки/библиотеки.
- можно использовать js-библиотеки для подсветки кода (highlight.js, CodeMirror, Ace etc.)
