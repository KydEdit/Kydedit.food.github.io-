import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    // FORMS

	const forms = document.querySelectorAll(formSelector);
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	// const postData = async (url, data) => {
	// 	const res = await fetch(url, {
	// 		method: "POST",
	// 		headers: {
	// 			'Content-type': 'application/json'
	// 		},
	// 		body: data
	// 	});

	// 	return await res.json();
	// };

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			// statusMessage.textContent = message.loading; - удалить
			// form.append(statusMessage); - удалить
			form.insertAdjacentElement('afterend', statusMessage);

			// const request = new XMLHttpRequest(); - удалить
			// request.open('POST', 'server.php'); - удалить

			// request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); - удалить
			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			// const object = {}; - удалить
			// formData.forEach(function(value, key) { - удалить
			//         object[key] = value; - удалить
			// }); - удалить
			// const json = JSON.stringify(object); - удалить
			// formData - удалить
			// request.send(json); - удалить

			// fetch('server.php', { - удалить
			//         method: "POST", - удалить
			//         headers: { - удалить
			//                 'Content-type': 'application/json; charset=utf-8' - удалить
			//         }, - удалить
			//         // body: formData - удалить
			//         body: JSON.stringify(object) - удалить
			// }) - удалить
			// JSON.stringify(object)
			postData('http://localhost:3000/requests', json)
				// .then(data => data.text()) - удалить 
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				})

			// request.addEventListener('load', () => { - удалить
			//         if (request.status === 200) { - удалить
			//                 console.log(request.response); - удалить
			//                 showThanksModal(message.success); - удалить
			// statusMessage.textContent = message.success; - удалить
			// setTimeout(() => { - удалить
			// statusMessage.remove(); - удалить
			// }, 2000); - удалить 
			//                 form.reset(); - удалить
			//         } else { - удалить
			//                 showThanksModal(message.failure); - удалить            
			//         } - удалить
			// }); - удалить
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal('.modal');
		}, 4000);
	}
}

export default forms;