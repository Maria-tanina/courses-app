![image_2023-03-19_22-42-26 (2)](https://user-images.githubusercontent.com/107557939/226208209-ca359400-8fa1-4c07-a509-62cfe4e4b202.png)

Для того, щоб запустити проект, необхідно завантажити архів та прописати наступні команди:
1. npm i
2. npm start
3. Відкриваємо паралельно ще одну консоль та запускаємо: npx json-server src/json/data.json --port 8000
4. Вмикаємо в браузері Access-Control-Allow-Origin(для того щоб відео не блокувалися CORS)
#
Чому потрібно запускати json-server? 
Я використовую браузер Google Chrome, мені не вдалося підключитися до API через CORS-політику. Браузер блокує будь-які спроби підключитися до API навіть з використанням Access-Control-Allow-Origin. Тому, щоб не витрачати час, я зробила це за допомогою json-server.

#
Логіка, якою я керувалась при написанні додатку:

Перший етап - створення кастомного хуку для фетчингу даних з нашої БД. Хук зроблено так, щоб його у майбутньому можна було використовувати для будь-яких HTTP-запитів з різними параметрами. Також створюємо функцію для трансформації отриманих даних _transformCourses. 

Другий етап - створення ієрархії компонентів, робота з даними, які приходять з сервера та відображення іх на сторінці. Кастомний хук http.hook.js задає стейт process, і в залежності від його поточного значення маємо різні стани компоненту: waiting, loading, confirmed, error. Використовуємо цей хук для всіх компонентів і модифікуємо рузультат залежно від потреб. 

Третій етап - реалізація маршрутизації по додатку за допомогою "React Router DOM". Також зробила компонент ErrorBoundary для того, щоб при помилках не ломався весь додаток, а лише дочірній компонент ErrorBoundary

Далі - локальне збереження переглянутих уроків. Якщо користувач заходть на курс вперше, йому буде відображатись перше відео з курсу. Якщо коричтувач вже був на сторінці цього курсу та дивився якесь відео, його ідентифікатор буде збережено до localstorage, та при наступному відвідуванні користувачу буде відкриватись це відео(id витягується з localstorage)

Звісно, є баги, які я не встигла пофіксити:
1. picture in picture перестає працювати при маршрутизації всередині додатку
2. не зберігається прогресс перегляду відео(конкретний час)
3. Скаче анімація завантаження сторінки та пагінація трохи скаче :)
4. Якщо на сторінці з уроками відео 404, зациклюється анімація безкінечної прогрузки, не знайшла як через hls обробляти 404 та сповіщати про це користувача
