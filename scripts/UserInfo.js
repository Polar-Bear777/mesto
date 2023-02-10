// УПРАВЛЕНИЕ ОТОБРАЖЕНИЕМ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ НА СТРАНИЦЕ
export class UserInfo {
	constructor({name, info}) {
	this._name = document.querySelector(name);
	this._info = document.querySelector(info);
	}

	// Возвращаем объект с данными пользователя
	getUserInfo() {
		return {
			name: this._name.textContent,
			info: this._info.textContent
		}
	}

	// Принимаем новые данные пользователя и добавляем их на страницу
	setUserInfo(value) {
		this._name.textContent = value.name;
		this._info.textContent = value.info;
	}
}
