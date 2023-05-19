
# Грузовики-Юг

Грузовики-Юг - это интернет-магазин для продажи и доставке деталей грузовым автомобилей и прицепам по Ростовской Области и России. Компания основалась в 2008 году и на рынке уже 15 лет. Так-же данная фирма занимается ремонтом Европейский и Американсих видов грузовых автомобилей. 


## Tech Stack

**Client:** Next, Axios, SCSS, MUI UI elements

**Server:** Laravel 9

**DataBase:** MySQL
 

## Structure

**Structure:**

Front-end

1. ***core*** - примитивные, низкоуровневые компоненты
2. ***shared*** - общие компоненты для всего приложения
3. ***features*** - фичи для определенных страниц

**Core**

UI компоненты, либо настроенные обертки над компонентами UI фреймворка. Мельчайшие строительные блоки. Пример: текстовый
инпут, селект, карточка, заголовок.

**Shared**

Более объемные компоненты, которые могут строиться из нескольких core-компонентов. Переиспользуются во всем приложении.
Например поля, настроенные для работы с React Hook Form, layout-ы, панели навигации, универсальные фильтры, таблицы.
Могут быть разбиты по кастомной доменной логике -

| Домен    |                    Компонент                    |
|----------|:-----------------------------------------------:|
| fields   |   TextField, SelectField, CheckboxField, ....   |
| layouts  |          AdminLayout, NewsLayout, ....          |
| panels   |       ProductPanel, NavigationPanel, ....       |
| modals   |          ConfirmModal, EditModal, ....          |
| user     | UserList, UserCreateForm, <br/>UserAvatar, .... |
| todo     |     TodoList, TodoCreateForm, TodoCard, ...     |
| feedback |        FeedbackForm, FeedbackButton, ...        |

Также есть Shared-утилиты - компоненты, которые визуально ничего не рендерят, но необходимы для переиспользования.
Находятся в папке **shared/utilities**

|           |                  Компонент                  |
|-----------|:-------------------------------------------:|
| utilities | ErrorBoundary, Meta, GoogleAnalytics,  .... |

**Features**

Компоненты, которые подключаются только на определенной странице, соответственно название директории должно
соответствовать названию страницы. Смесь custom, shared и core компонентов, настроенных под конкретную фичу.



## Authors

- [@Renth0p](https://github.com/Renth0p)
- [@Leawzy](https://github.com/Leawzy)


## Installation

Install Front-end

```bash
  git clone <url>
  cd front
  npm install / npm i
  npm run dev
```
    
