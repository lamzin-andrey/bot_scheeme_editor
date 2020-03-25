# En

## About

Bot Circuit Designer

### Кастомизация внешнего вида блоков схемы

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





