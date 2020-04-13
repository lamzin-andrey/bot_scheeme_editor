# Ru

[En](#en)

[Что это](#что-это)

[Установка](#установка)

[Сборка](#сборка)

[Кастомизация внешнего вида блоков схемы](#кастомизация-внешнего-вида-блоков-схемы)

[Настройка контекстного меню компонентов](#настройка-контекстного-меню-компонентов)

[Настройка каталога с изображениями](#настройка-каталога-с-изображениями)

[Изменение экспортируемого и импортируемого JSON в более удобочитаемый формат](#изменение-экспортируемого-и-импортируемого-json-в-более-удобочитаемый-формат)

[Архитектура приложения](#архитектура-приложения)





## Что это

Конструктор схем диалога для ботов

### Установка

1 Клонируйте приложение из репозитория github
 `git clone https://github.com/lamzin-andrey/bot_scheeme_editor.git`

2 Переименуйте js/app.example.css в js/app.js и измените в секции конфигурации необходимые вам параметры

3 Редактируйте css файлы, чтобы задать необходимые вам стили для отображаемых блоков

4 При необходимости конфигурируйте пути к каталогу с изображениями, которые использует редактор схем. Для этого переименуйте app.example.js в app.js, измените путь к каталогу с изображениями в секции конфигурации
и пересобирите проект

5 При необходимости кастомизируйте расположение коннекторов на сторонах блоков

6 При необходимости измените экспортируемого и импортируемого JSON в более удобочитаемый формат.

### Сборка

При сборке использовался npm версии 5.6.0, версия nodejs v8.10.0.

Откройте терминал или командную строку в каталоге с package.json и выполните

`npm install`

`npm run prod`



### Кастомизация внешнего вида блоков схемы

[Цветовая схема и всё что можно изменить с помощью css](#цветовая-схема-и-всё-что-можно-изменить-с-помощью-css)

[Кастомизация расположения коннекторов на блоке](#кастомизация-расположения-коннекторов-на-блоке)

#### Цветовая схема и всё, что можно изменить с помощью css

Можно изменять цвета блоков, скрывать отображение заголовка блока, текстов рядом с коннекторами.

Для этого к странице подключается файл theme.css.

Пример файла, кастомизирующего блок "Сообщение":

```css
/* Скрыть стандартный заголовок блока и метки рядом с коннекторами */
 .messagecomponent .title, .messagecomponent .input .input-title,  .messagecomponent .output .output-title{
	display:none!important;
}

/* Цвета активного блока */
.messagecomponent.selected {
	background-color: #1B63FD!important;
	color: white!important;
	border-color: #060F5E!important;
}

/* Цвета неактивного блока */
.messagecomponent {
	background-color: #B9C6E2!important;
	color: black!important;
	border-color: #6277A2!important;
}
```

#### Кастомизация расположения коннекторов на блоке

Приложение можно сконфигурировать так, чтобы конекторы располагались на горизонтальных гранях блоков.

Для этого надо изменить конфигурацию в app.js:

````javascript
//Конфигурация расположения коннекторов на блоках различного типа
//см. константы в определении класса BotSchemeEditorBaseComponent
//import BotSchemeEditorBaseComponent from './classes/retecomponents/botschemeeditorbasecomponent';
//Тут хотелось красиво, но к сожалению невозможно импортировать BotSchemeEditorBaseComponent 
//Пришлось обойтись строками
Vue.prototype.$config.connectorsLocation = {
	//Блок "Начало"
	//BeginComponent: BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R,
	BeginComponent: 'SOCKET_POSITION_H_L2R',

	//Блок "Сообщение"
	MessageComponent: 'SOCKET_POSITION_H_L2R',

	//Блок "Таймер"
	TimerComponent: 'SOCKET_POSITION_V_T2B',

	//Блок "Условие"
	ConditionComponent: 'SOCKET_POSITION_H_L2R',

	//Блок "Действие"
	ActionComponent: 'SOCKET_POSITION_H_L2R'
};

// /Конфигурация
````

Константы, задающие стороны, на которых расположенны коннекторы можно найти в определени класса `BotSchemeEditorBaseComponent`; Их значения равны их именам.


##### О реализации

Все классы, реализующие элементы схемы наследуются от класса `BotSchemeEditorBaseComponent`, который в свою очередь наследуется от класса `Rete.Component`.

Конструктор класса принимает аргументы:

````javascript
class BotSchemeEditorBaseComponent extends Rete.Component {
	/**
	 * @param {String} sComponentId string id компонента. На схеме могут быть один или несколько блоков такого "класса"
	 * @param {Rete.Socket} oSocket Сокет для соединения компонентов
	 * @param {Function} VueI18n translator 
	 * @param {String} socketPosition = BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R можно изменять позицию коннекторов (см. константы BotSchemeEditorBaseComponent.SOCKET_POSITION_* )
	*/
	constructor(sComponentId, oSocket, translator, socketPosition = BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R) {
		//....
	}
	//...
}
````

Мы видим, что четвертый аргумент конструктора по умолчанию равен константе

`BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R`

Это значение обеспечивает дефолтный вид Rete.Node, когда входяшие коннекторы расположены на левой грани блока,
а исходящие на правой грани блока.

Это поведение можно изменить, передав в конструктор класса четвертым аргументом одну из констант

`BotSchemeEditorBaseComponent.SOCKET_POSITION_V_T2B`

или

`BotSchemeEditorBaseComponent.SOCKET_POSITION_V_B2T`.

````javascript
/** @property static SOCKET_POSITION_V_T2B = 'SOCKET_POSITION_V_T2B' Размещает коннекторы на горизонтальной грани блока input сверху, output снизу */
/** @property static SOCKET_POSITION_V_B2T = 'SOCKET_POSITION_V_B2T' Размещает коннекторы на горизонтальной грани блока input снизу, output сверху */
````

Также можно изменить это поведение, если экземпляр класса уже создан.
Для этого существует метод

````javascript

class BotSchemeEditorBaseComponent extends Rete.Component {
	/**
	 * @description Устанавливает позицию входных и выходных коннекторов (сторону блока, на которой они находятся)
	 * @param {String} socketPosition одна из констант BotSchemeEditorBaseComponent.SOCKET_POSITION_*
	 */
	setSocketsPosition(socketPosition) {
		//...
	}
	//...
}
````

### Настройка контекстного меню компонентов

Показалось логичным настраивать контекствное меню компонента в классе, определяющим этот компонент (подобно тому, как мы настраиваем в коде класса, расширяющего Rete.Component количество входных и выходных узлов и множественное или не множественное).

Для этого **в этом приложении (BotSchemeEditor)** наследники `BotSchemeEditorBaseComponent` должны реализовать метод

```javascript
/**
 * @param {Object} applicationContext Должен обеспечивать методы removeBlockById и emitEditBlockEvent
 * @param {Rete.node} node Узел (блок) схемы
 * @return Object
*
contextMenu(applicationContext, node)
```

Пример для компонента `BotSchemeEditorMessageComponent` (этот код находится в классе `BotSchemeEditorBaseComponent`):

```javascript
/**
 * @description Конфигурация контекстного меню компонента.
 * @see Документацию по конфигурации ContextMenuPlugin (rete-context-menu-plugin  version ^0.5.2), поле nodeItems
 * Проверка на равенство node.name имени компонента производится в botSchemeEditorArea.configureContextMenu
 * @param {Object} applicationContext Должен обеспечивать методы removeBlockById и emitEditBlockEvent
 * @param {Rete.node} node Узел (блок) схемы
*/
contextMenu(applicationContext, node) {
		let oMenu = {
			'app.Remove'() {
				applicationContext.removeBlockById(node.id);
			},
			'app.Edit'() {
				applicationContext.emitEditBlockEvent(node.id);
			},
			//"Глушим" стандартный пункт контекстного меню, чтобы была возможность его локализовать
			'Delete': false,
			//"Глушим" стандартный пункт контекстного меню, потому что он не нужен
			'Clone': false,
		};
		return this.localizeMenu(oMenu);
	}
```
В качестве `applicationContext` в приложении BotSchemeEditor передаётся контекст Vue компонента `botSchemeEditorArea`.

В нём уже реализованы методы `removeBlockById` и `emitEditBlockEvent`.

При необходимости совершать какие-то другие действия с помощью новых пунктов контекстного меню, 
следует модифицировать объект, возвращаемый contextMenu, а логику их реализации 
лучше вынести в новые методы `botSchemeEditorArea`, так как компонент ничего не должен знать ни о редакторе rete, в котором он отображается, ни о внешних редакторах своих свойств, 
ни о чём-либо другом, что может понадобиться.

Вызов метода `localizeMenu ()` важен, если вы хотите применить свой lang-файл для контекстного меню.

### Настройка каталога с изображениями

Для настройки путей к папке, в которой лежат изображения переименуйте файл 

`app.example.js`

в 

`app.js`

и измените переменную 

````javascript
//Конфигурация каталога с изображениями, которые использует приложение
Vue.prototype.$config = {};
Vue.prototype.$config.imageCatalog = './images/bot-scheme-toolbar';
````
например, на моём сервере она равна

`/portfolio/web-razrabotka/bot_scheme_editor/images/bot-scheme-toolbar`

### Изменение экспортируемого и импортируемого JSON в более удобочитаемый формат

При необходимости получить более удобочитаемый формат JSON надо расширить функционал редактора.

Сделать это просто: в компоненте `botSchemeEditor` существуют методы

`onClickExportToJSONButton` и `onClickImportFromJSONButton`.

````javascript
/**
 * @param {File} file
*/
onClickImportFromJSONButton(file){
	
	//...

	fr.onloadend = (result) => {
		//Сохранили текущую схему.
		this.confirmSaveCurrentScheme();


		//здесь normalize JSON если понадобится, мне rete формат кажется вполне логичным
		//например так:
		//let oJSONConverter = new JSONConverter();//JSONConverter - класс, который конвертирует JSON  rete в желаемый JSON
		//let JSONData = oJSONConverter.toReteFormat(fr.result);

		let JSONData = fr.result;

		//...

	};

	//...
},
````


````javascript
/**
 * @description Обработка кликов на кнопке Экспорт в JSON
*/
onClickExportToJSONButton() {
	//...

	let jsonData = this.$refs.editorArea.getJSON();
	//здесь normalize JSON если понадобится, мне rete формат кажется вполне логичным
	//например так:
	//let oJSONConverter = new JSONConverter();//JSONConverter - класс, который конвертирует JSON  rete в желаемый JSON
	//let jsonData = oJSONConverter.fromReteFormat(this.$refs.editorArea.getJSON() );
	
	//...
},
````

Класс JSONConverter следует написать соответственно вашим пожеланиям к спецификации формата.

## Архитектура приложения

[Конфигурация](#конфигурация)

[Добавление новых типов блоков](#добавление-новых-типов-блоков)

[Создание редакторов свойств для новых типов блоков](#создание-редакторов-свойств-для-новых-типов-блоков)

[Где глобальные переменные rete.editor и rete.engine?](#где-глобальные-переменные-reteeditor-и-reteengine)

При проектировании использовалась идея паттерна Mediator (идея, а не сам паттерн, потому что специфика фреймвёрка vue требует использования vue-компонентов (вид+логика в одном компоненте), что делает невозможным определить класс абстрактного Посредника и наследоваться от него конкретным. Можно было бы использовать примеси vue, но в этом по сути нет необходимости). 

Роль посредника выполняет компонент `botSchemeEditor`. Он принимает сигналы (обрабатывает события) поступающие от кнопок панели управления (тулбара `botSchemeToolbar`), компонента `botSchemeEditorArea`, в котором инкапсулирована вся работа с движком rete (`botSchemeEditorArea` при работе использует классы из каталога `classes/retecomponents` и `classes/retecontrols` для более лёгкого поиска соответствующей логики) и компонентов `botSchemeMessageEditor` и `botSchemeCompoundObjectEditor` реализующих формы редактирования свойств элементов схемы.

`botSchemeMessageEditor` используется для редактирования текста сообщения.

`botSchemeCompoundObjectEditor` настраивается через свои атрибуты, один его экземпляр используется для редактирования свойств элементов схемы "Условие", второй экземпляр используется для редактирования свойств элементов схемы "Действие".

`botSchemeEditor` получает сигналы от перечисленных компонентов, определяет, какому компоненту их переадресовать (например, при выборе пункта контекстного меню элемента схемы `Сообщение` данные узла передаются компоненту `botSchemeMessageEditor` и этот компонент отображается на дисплее).

Помимо этого `botSchemeEditor` содержит обёртки вокруг методов `window.alert()` и `window.confirm()`. Это позволит при необходимости заменить стандартные браузерные диалоги например модалами bootstrap.

### Конфигурация

Конфигурация приложения осуществляется в app.js (нужно скопировать app.example.js).

При необходимости можно настроить путь к каталогу с изображениями (например, на вашем сайте может быть принято, чтобы все изображения находились в корневом каталоге `images`).

Для этого надо изменить значение переменной `Vue.prototype.$config.imageCatalog`.

Также можно настроить для всех блоков сторону блока, на которой будут располагаться коннекторы (по умолчанию rete располагает их на вертикальных сторонах блока).

Для этого надо изменить значение переменной `Vue.prototype.$config.connectorsLocation`.
Это объект, имена полей которого совпадают с идентификаторами типов элементов схемы. См. пример в [Кастомизация расположения коннекторов на блоке](#кастомизация-расположения-коннекторов-на-блоке)

### Добавление новых типов блоков

Новый тип блока определяется в классе, который должен быть в файле  `js/classes/retecomponents`

и наследоваться от `BotSchemeEditorBaseComponent` (который в свою очередь расширяет Rete.Component).

Это наследование обеспечит существование у компонента контекстного меню из двух пунктов `Удалить` и `Редактировать`. 

Если нужно другое контекстное меню компонента, перегрузите в наследнике метод `contextMenu(applicationContext, node)`. `applicationContext` - это ссылка на компонент `botSchemeEditorArea`. **Не забывайте использовать ключи локализации и вызывать метод `localizeMenu()` чтобы локализация строк - названий пунктов была применена.**
[Настройка контекстного меню компонентов](#настройка-контекстного-меню-компонентов)

Если блоку нужен контрол, его определение должно быть в `js/classes/rete/controls`. 
Шаблон представления контрола, если вы не хотите иметь в вашем коде верстку в длинной строковой переменной надо расположить в `views/botSchemeEditor/botSchemeReteControlsViews`.

Компонент rete регистрируется в методе `registerReteComponents()` vue-компонента `botSchemeEditorArea`.

При редактировании и удалении блока со схемы происходят события `editnodeevent` и `deletenodeevent` (если не кастомизировалось контекстное меню). Если с компонентом должны происходить какие-то новые действия, (например, добавили новые пункты контекстного меню) которые будут влиять на другие компоненты приложения, надо будет добавить в `botSchemeEditorArea` соответствующие методы, которые выполнят всю необходимую работу и оповестят о произошедшем `botSchemeEditor`.

### Создание редакторов свойств для новых типов блоков

Если новые типы блоков для схемы имеют сложную внутреннюю структуру и вы не можете обойтись только размещением контролов на rete-компоненте, добавьте в приложение новый редактор свойств для нового типа блока. 
Новый компонент включается в верстку `botSchemeEditor` по аналогии с компонентами `botSchemeCompoundObjectEditor` и `botSchemeMessageEditor`.

`botSchemeEditor` на момент написания документации обрабатывает все события от редакторов в методе `onPropertyEditorEvent`, а вся необходимая информация о блоке схемы (как правило, достаточно его `id` и значений отредактированных свойств) передаётся в объекте события. `botSchemeEditor` передаёт полученные данные в `botSchemeEditorArea` (а при необходимости может передать и `botSchemeToolbar`).

#### Скрытие редактора свойств нового компонента

Чтобы избежать ситуации, когда на странице после закрытия одного редактора свойств неожиданно показан редактор свойств объекта другого типа, следует для обработки скрытия редактора нового типа использовать метод `hideAllEditors`. Добавьте в этот метод код, который скрывает ваш новый редактор. Для скрытия редактора используйте только метод `hideAllEditors`.



### Где глобальные переменные rete.editor и rete.engine?

Исходя из принципа "Одно приложение - одна глобальная переменная"  от глобальных переменных `rete` `editor` и `engine` решено было отказаться.

Вместо этого используются поля компонента `botSchemeEditorArea`. Они могут быть переданы при необходимости наследникам `BotSchemeEditorBaseComponent` через сеттеры или через новый аргумент конструктора, но пока в этом нет необходимости.



# En

[Ru](#ru)

[About](#about)

[Installation](#installation)

[Build](#build)

[Customization of the appearance of circuit blocks](#customization-of-the-appearance-of-circuit-blocks)

[Setting the context menu of components](#setting-the-context-menu-of-components)

[Image Directory Setup](#image-directory-setup)

[Changing exported and imported JSON to a more readable format](#changing-exported-and-imported-json-to-a-more-readable-format)

[Application architecture](#application-architecture)

## About

Constructor of dialog schemes for bots

### Installation

1 Clone from github
 `git clone https://github.com/lamzin-andrey/bot_scheeme_editor.git`

2 Rename js/app.example.css to js/app.js and change in cinfiguration section neeldy parameters

3 Rename css files and change colours for blocks of circuit and hide excess parts of block (for example, I hide section with title)/

4 If necessary, configure the directory paths with the images that the schematic editor uses. To do this, rename app.example.js to app.js, change the path to the directory with images in the configuration section and rebuild the project

5 Customize the location of the connectors on the sides of the blocks

6 Changing the exported and imported JSON to a more readable format.

### Build

The build used npm version 5.6.0, version nodejs v8.10.0.

Open a terminal or command line in the directory with package.json and execute

`npm install`

`npm run prod`


### Customization of the appearance of circuit blocks

[Color scheme and everything that can be changed using css](#color-scheme-and-everything-that-can-be-changed-using-css)

[Custom connectors position on sides of block](#custom-connectors-position-on-sides-of-block)

[About implementation](#about-implementation)

#### Color scheme and everything that can be changed using css

You can change the colors of the blocks, hide the display of the block title, texts next to the connectors.

To do this, the theme.css file is connected to the page.

An example of a file customizing the Message block:


```css
/* Hide the standard title of the block and label next to the connectors */
 .messagecomponent .title, .messagecomponent .input .input-title,  .messagecomponent .output .output-title{
	display:none!important;
}

/* Active Block Colors */
.messagecomponent.selected {
	background-color: #1B63FD!important;
	color: white!important;
	border-color: #060F5E!important;
}

/* Inactive block colors */
.messagecomponent {
	background-color: #B9C6E2!important;
	color: black!important;
	border-color: #6277A2!important;
}
```

#### Custom connectors position on sides of block

The application can be configured so that the connectors are located on the horizontal faces of the blocks.

Change your app.js:

````javascript
//Configuration of the arrangement of connectors on blocks of various types
//see constants in the BotSchemeEditorBaseComponent class definition
//import BotSchemeEditorBaseComponent from './classes/retecomponents/botschemeeditorbasecomponent';
//unfortunately it is impossible to importBotSchemeEditorBaseComponent 
Vue.prototype.$config.connectorsLocation = {
	//"Begin" block
	//BeginComponent: BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R,
	BeginComponent: 'SOCKET_POSITION_H_L2R',

	//"Сообщение" block
	MessageComponent: 'SOCKET_POSITION_H_L2R',

	//"Timer" block
	TimerComponent: 'SOCKET_POSITION_V_T2B',

	//"Condition" block
	ConditionComponent: 'SOCKET_POSITION_H_L2R',

	//"Action" block
	ActionComponent: 'SOCKET_POSITION_H_L2R'
};

````

Constants defining the sides on which the connectors are located can be found in the class definition`BotSchemeEditorBaseComponent`; Their meanings are equal to their names.


##### About implementation

All classes implementing items of circuit extends class `BotSchemeEditorBaseComponent` (and `BotSchemeEditorBaseComponent` extends `Rete.Component` class).

Constructor `BotSchemeEditorBaseComponent` get arguments:

````javascript
class BotSchemeEditorBaseComponent extends Rete.Component {
	/**
	 * @param {String} sComponentId string id of component. The circuit can containts one or more blocks of the "class"
	 * @param {Rete.Socket} oSocket Socket for nodes connection
	 * @param {Function} VueI18n translator 
	 * @param {String} socketPosition = BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R allows change connectors position (see constants BotSchemeEditorBaseComponent.SOCKET_POSITION_* )
	*/
	constructor(sComponentId, oSocket, translator, socketPosition = BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R) {
		//....
	}
	//...
}
````

We see, that fourth argument of constructor by default equal a constant

`BotSchemeEditorBaseComponent.SOCKET_POSITION_H_L2R`

This value provides Rete.Node view , when inputs connectors located on left side of the block,
and output connectors located on the right side of the block.

This behavior can be changed, passing in class constructor fourth argument one from, constants

`BotSchemeEditorBaseComponent.SOCKET_POSITION_V_T2B`js/app.example.js

or

`BotSchemeEditorBaseComponent.SOCKET_POSITION_V_B2T`.

````javascript
/** @property static SOCKET_POSITION_V_T2B = 'SOCKET_POSITION_V_T2B' Located connectors on horizontal sides of the block. Input on top side, output on bottom side. */
/** @property static SOCKET_POSITION_V_B2T = 'SOCKET_POSITION_V_B2T' Located connectors on horizontal sides of the block. Input on bottom side, output on top side. */
````

Also we can change view, if object of class already created.
Для этого существует метод

````javascript

class BotSchemeEditorBaseComponent extends Rete.Component {
	/**
	 * @description Set connectors positions (sides of block, where is connectors)
	 * @param {String} socketPosition one from constants BotSchemeEditorBaseComponent.SOCKET_POSITION_*
	 */
	setSocketsPosition(socketPosition) {
		//...
	}
	//...
}
````


### Setting the context menu of components

It seemed logical to configure the context menu of a component in the class that defines this component (similar to how we configure in the code of a class that extends
Rete Component the number of input and output nodes and multiple or not multiple).

To do this **in this application (BotSchemeEditor)** descendants of `BotSchemeEditorBaseComponent` must implement the method

```javascript
contextMenu(applicationContext, node)
```

Example for component `BotSchemeEditorMessageComponent` (this code from class (`BotSchemeEditorBaseComponent`):

```javascript
/**
 * @description Component context menu configuration.
 * @see Documentation ContextMenuPlugin (rete-context-menu-plugin version ^ 0.5.2), field nodeItems
 * Check for equality node.name component name is made in botSchemeEditorArea.configureContextMenu
 * @param {Object} applicationContext Must provide methods applicationContext и emitEditBlockEvent
 * @param {Rete.node} node Node of Scheme (circuit). 
*/
contextMenu(applicationContext, node) {
	let oMenu = {
		'app.Remove'() {
			applicationContext.removeBlockById(node.id);
		},
		'app.Edit'() {
			applicationContext.emitEditBlockEvent(node.id);
		},
		//“Mute” the standard context menu item so that it can be localized
		'Delete': false,
		//"Mute" the standard context menu item because it is not needed
		'Clone': false,
	};
	return this.localizeMenu(oMenu);
}
```
As `applicationContext` in application BotSchemeEditor passed the context Vue-component `botSchemeEditorArea`.

It already implements methods `removeBlockById` and `emitEditBlockEvent`.

If necessary, to perform some other actions using the new context menu items,
you should modify the object returned by contextMenu, and the logic of their implementation
it’s better to bring `botSchemeEditorArea` to the new methods, since the component should not know anything about the rete editor in which it is displayed, or about external editors of its properties,
about anything else that you might need.

Calling method `localizeMenu()` is important, if you want apply your lang file for context menu.

### Image Directory Setup

Rename the file to configure the paths to the folder in which the images are located

`app.example.js`

to

`app.js`

and change variable

````javascript
//Configuration path with images for this application
Vue.prototype.$config = {};
Vue.prototype.$config.imageCatalog = './images/bot-scheme-toolbar';
````
for example, on my server it equal

`/portfolio/web-razrabotka/bot_scheme_editor/images/bot-scheme-toolbar`

### Changing exported and imported JSON to a more readable format

If you need to get a more readable JSON format, you need to expand the editor's functionality.

This is easy to do: there are methods in the `botSchemeEditor` component

`onClickExportToJSONButton` and `onClickImportFromJSONButton`.

````javascript
/**
 * @param {File} file
*/
onClickImportFromJSONButton(file){
	
	//...

	fr.onloadend = (result) => {

		//...


		//normalize JSON here if `rete` JSON unreadable for you
		//for example:
		//let oJSONConverter = new JSONConverter();//JSONConverter - a class that converts JSON `rete` into the desired JSON
		//let JSONData = oJSONConverter.toReteFormat(fr.result);

		let JSONData = fr.result;

		//...

	};

	//...
},
````


````javascript
/**
 * @description Click on button Export to JSON
*/
onClickExportToJSONButton() {
	//...

	let jsonData = this.$refs.editorArea.getJSON();
	//normalize JSON here if `rete` JSON unreadable for you
	//for example:
	//let oJSONConverter = new JSONConverter();//JSONConverter - a class that converts JSON `rete` into the desired JSON
	//let jsonData = oJSONConverter.fromReteFormat(this.$refs.editorArea.getJSON() );
	
	//...
},
````

The JSONConverter class should be written according to your wishes for the format specification.


## Application architecture

[Configuration](#configuration)

[Adding New Block Types](#adding-new-block-types)

[Creating Property Editors for New Block Types](#creating-property-editors-for-new-block-types)

[Hiding the property editor of the new component](#hiding-the-property-editor-of-the-new-component)

[Where are the global variables reteeditor and reteengine?](#where-are-the-global-variables-reteeditor-and-reteengine)

The design used the idea of the Mediator pattern. 

The Mediator role is performed by the `botSchemeEditor` component. It receives signals (processes events) coming from the buttons of the control panel (the `botSchemeToolbar` toolbar), the` botSchemeEditorArea` component, which encapsulates all work with the rete engine (`botSchemeEditorArea` uses classes from the` classes/retecomponents` and `classes/retecontrols` to more easily find the appropriate logic) and the `botSchemeMessageEditor` and` botSchemeCompoundObjectEditor` components that implement forms for editing properties of circuit elements.

`botSchemeMessageEditor` used to edit message text.

`botSchemeCompoundObjectEditor` is configured through its attributes, one instance of it is used to edit the properties of the elements of the" Condition "scheme, the second instance is used to edit the properties of the elements of the" Action "scheme.

`botSchemeEditor` receives signals from the listed components, determines which component to forward to (for example, when the context menu item of the` Message` scheme element is selected, the node data is transmitted to the `botSchemeMessageEditor` component and this component is displayed).

In addition, `botSchemeEditor` contains wrappers around the` window.alert () `and` window.confirm () `methods. This will, if necessary, replace standard browser dialogs with bootstrap modules, for example.

### Configuration

Application configuration is done in app.js (you need to copy app.example.js).

If necessary, you can configure the path to the directory with images (for example, on your site it can be accepted that all images are in the root directory of `images`).

To do this, change the value of the variable `Vue.prototype. $ Config.imageCatalog`.

You can also configure for all blocks the side of the block on which the connectors will be located (by default, rete places them on the vertical sides of the block).

To do this, change the value of the variable `Vue.prototype. $ Config.connectorsLocation`.
This is an object whose field names coincide with the identifiers of the types of schema elements. See an example in [Custom connectors position on sides of block](#custom-connectors-position-on-sides-of-block)

### Adding New Block Types

A block of the new type must be defined in class code, which must be in catalog `js/classes/retecomponents`
and extend `BotSchemeEditorBaseComponent` (which in turn expands `Rete.Component`).

This inheritance will ensure the existence of the context menu component of the two items `Delete` and` Edit`.

If you need a different component context menu, overload the `contextMenu (applicationContext, node)` method in the descendant. `applicationContext` is a reference to the` botSchemeEditorArea` component. **Do not forget to use localization keys and call the `localizeMenu()` method so that the localization of strings - item names is applied.**
[Setting the context menu of components](#setting-the-context-menu-of-components)

If a block needs `control`, its definition should be in `js/classes/rete/controls`.
If you don’t want to have a layout in a long string variable in your code, you must place it in `views/botSchemeEditor/botSchemeReteControlsViews`.

The rete component must be registered in the method `registerReteComponents () of the` vue component `botSchemeEditorArea`.

When editing and deleting a block from a scheme, the events `editnodeevent` and` deletenodeevent` occur (if the context menu has not been customized in child of `BotSchemeEditorBaseComponent`). If some new actions should happen to the component (for example, was added new context menu items) that will affect other components of the application, you will need to add the appropriate methods to botSchemeEditorArea that will do all the necessary work and create notify for botSchemeEditor about what happened.

### Creating Property Editors for New Block Types

If the new block types for the circuit have a complex internal structure and you can’t edit by just placing controls on the rete component, add a new property editor to the application for the new block type.
The new component must be included in the layout of `botSchemeEditor` by analogy with the components `botSchemeCompoundObjectEditor` and `botSchemeMessageEditor`.

`botSchemeEditor` at the time of writing the documentation processes all events from editors in the` onPropertyEditorEvent` method, where there is all the necessary information about the block being edited (as a rule, the identifier and values of the edited properties are sufficient). `botSchemeEditor` transfers data to `botSchemeEditorArea` (it can also transmit` botSchemeToolbar` if necessary).

#### Hiding the property editor of the new component

In order to avoid the situation when, after closing one property editor, an object editor of another type is unexpectedly displayed, use the `hideAllEditors()` method to hide the editor of a new type. Add code to this method that your new editor is hiding. To hide the editor, use only the `hideAllEditors()` method.


### Where are the global variables rete.editor and rete.engine?

Based on the principle of "One application - one global variable", it was decided to refuse the `rete`` editor` and `engine` global variables.

Instead, the fields of the `botSchemeEditorArea` component are used. They can be passed if necessary to the heirs of `BotSchemeEditorBaseComponent` through setters or through a new constructor argument, but so far this is not necessary.