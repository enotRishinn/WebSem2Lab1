# Задание
---
Сверстать страницу, содержащую поле ввода и кнопку для поиска информации о погоде в заданном городе. По нажатию на кнопку происходит вызов внешнего API погоды (например, https://openweathermap.org/api). Получаемые данные (не менее 5 элементов) отрисовываются на этой же странице. 

Для отрисовки полученных данных должен использоваться один из клиентских шаблонизаторов (например, https://proglib.io/p/templating-languages-and-engines/). Для визуального оформления страницы используется CSS препроцессор (SASS, LESS, Stylus).
Работа делается в публичном github-репозитории. Все необходимые инструкции для локального запуска проекта должны быть описаны в README.md в корне проекта.

# Запуск и получение прогноза погоды
---

Для открытия web-страницы необходимо запустить файл index.html. Для получения данных о погоде необходим доступ в интернет. Для поиска погоды впишите город латинскими буквами в поле ввода и нажать кнопку поиска. Если появилось предупреждение о ошибке запроса, проверьте правильность написания города.

# Информация о структуре и файлах проекта
---
Папки css и sass содержат файлы style.css и style.sass соответсвенно. Для написания стилей веб-страницы был использован препроцессор SASS. Ковертация SASS в CSS происходила с помощью программы prepros. Для того, чтобы использовать эту программу, необходимо установить ее на свой ПК, открыть, открыть в ней свой проект и настроить название файла, в который программа будет конвертировать код на css из файла sass. Если вы назовете файлы .css и . sass одинаково, как в данном случае, программа автоматически найдет файлы и будет автоматически конвертировать style.sass в style.css по ходу написания стилей в style.sass.

Файл index.html содержит html-код, формирующий веб-страницу и script weather-entry-template, формирующий отображение полученных данных о погоде с помощью шаблонизатора handlebars. 

Файл script.js содержит три функции. clickOnSearchButton() вызывается при нажатии на кнопку и отправляет запрос на https://openweathermap.org/api для получения информации о погоде в формате json. Функция getWeather(resp) выбирает из пришедшего ответа нужные параметры в формате json. displayWeather(weather) компилирует скрипт из html.index и помещает их с помощью handlebars на веб-страницу.
