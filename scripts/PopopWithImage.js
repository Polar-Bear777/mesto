import { Popup } from "./Popup.js";

// ОТКРЫТИЕ КАРТИНКИ ПОПАПА
export class PopupWithImage extends Popup {
	constructor(popupSelector, popupPhotoTitleElement, popupViewElement) {
		super(popupSelector);
		this._popupPhotoTitleElement = popupPhotoTitleElement;
		this._popupViewElement = popupViewElement;
	}

	// Перезаписываем родительский метод openPopup
	openPopup(popupPhotoTitleElement, popupViewElement) {
		super.openPopup();
		this._popupPhotoTitleElement.src = popupPhotoTitleElement;
		this._popupPhotoTitleElement.alt = popupViewElement;
		this._popupViewElement.textContent = popupViewElement;
	}
}
