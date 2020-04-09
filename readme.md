
# Ru

## Что это

Bot CircuitЦветовая схема и всё, что можно изменить с помощью css Designer

### Кастомизация внешнего вида блоков схемы

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

Показалось логичным настраивать контекствное меню компонента в классе, определяющим этот компонент (подобно тому, как мы настраиваем в коде класса, расширяющего Rete Component количество входных и выходных узлов и множественное или не множественное).

Для этого **в этом приложении (BotSchemeEditor)** наследники Rete.Component должны реализовать метод

```javascript
/**
 * @param {Object} applicationContext Должен обеспечивать методы removeBlockById и emitEditBlockEvent
 * @param {Rete.node} node Узел (блок) схемы
 * @return Object
*
contextMenu(applicationContext, node)
```

Пример для компонента `BotSchemeEditorMessageComponent`:

```javascript
/**
 * @description Конфигурация контекстного меню компонента.
 * @see Документацию по конфигурации ContextMenuPlugin (rete-context-menu-plugin  version ^0.5.2), поле nodeItems
 * Проверка на равенство node.name имени компонента производится в botSchemeEditorArea.configureContextMenu
 * @param {Object} applicationContext Должен обеспечивать методы removeBlockById и emitEditBlockEvent
 * @param {Rete.node} node Узел (блок) схемы
*/
contextMenu(applicationContext, node) {
	return {
		'Удалить'() {
			applicationContext.removeBlockById(node.id);
		},
		'Редактировать'() {
			applicationContext.emitEditBlockEvent(node.id);
		},
		//"Глушим" стандартный пункт контекстного меню, чтобы была возможность его локализовать
		'Delete': false,
		//"Глушим" стандартный пункт контекстного меню, потому что он не нужен
		'Clone': false,
	};
}
```
В качестве `applicationContext` в приложении BotSchemeEditor передаётся контекст Vue компонента `botSchemeEditorArea`.

В нём уже реализованы методы `removeBlockById` и `emitEditBlockEvent`.

При необходимости совершать какие-то другие действия с помощью новых пунктов контекстного меню, 
следует модифицировать объект, возвращаемый contextMenu, а логику их реализации 
лучше вынести в новые методы `botSchemeEditorArea`, так как компонент ничего не должен знать ни о редакторе rete, в котором он отображается, ни о внешних редакторах своих свойств, 
ни о чём-либо другом, что может понадобиться.





# En

## About

Bot Circuit Designer

### Customization of the appearance of circuit blocks

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

`BotSchemeEditorBaseComponent.SOCKET_POSITION_V_T2B`

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

To do this **in this application (BotSchemeEditor)** descendants of Rete.Component must implement the method

```javascript
contextMenu(applicationContext, node)
```

Example for component `BotSchemeEditorMessageComponent`:

```javascript
/**
 * @description Component context menu configuration.
 * @see Documentation ContextMenuPlugin (rete-context-menu-plugin version ^ 0.5.2), field nodeItems
 * Check for equality node.name component name is made in botSchemeEditorArea.configureContextMenu
 * @param {Object} applicationContext Must provide methods applicationContext и emitEditBlockEvent
 * @param {Rete.node} node Node of Scheme (circuit). 
*/
contextMenu(applicationContext, node) {
	return {
		'Удалить'() {
			applicationContext.removeBlockById(node.id);
		},
		'Редактировать'() {
			applicationContext.emitEditBlockEvent(node.id);
		},
		//“Mute” the standard context menu item so that it can be localized
		'Delete': false,
		//"Mute" the standard context menu item because it is not needed
		'Clone': false,
	};
}
```
As `applicationContext` in application BotSchemeEditor passed the context Vue-component `botSchemeEditorArea`.

It already implements methods `removeBlockById` and `emitEditBlockEvent`.

If necessary, to perform some other actions using the new context menu items,
you should modify the object returned by contextMenu, and the logic of their implementation
it’s better to bring `botSchemeEditorArea` to the new methods, since the component should not know anything about the rete editor in which it is displayed, or about external editors of its properties,
about anything else that you might need.