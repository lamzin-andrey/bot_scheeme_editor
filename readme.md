
# Ru

## Что это

Bot Circuit Designer

### Кастомизация внешнего вида блоков схемы

Можно изменять цвета блоков, скрывать отображение заголовка блока, текстов рядом с коннекторами.

Для этого к странице подключается файл theme.css.

Пример файла, кастомизирующего блок "Сообщение":

```css
/* Скрыть стандартный заголовок блока и метки рядлом с коннекторами */
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