function cl(message) {
	console.log(message)
}

$.fn.wordify = function(){
	this.find(":not(iframe,textarea)").addBack().contents().filter(function() {
		return this.nodeType === 3
	}).each(function(i) {
		var textnode = $(this)
		var text = textnode.text()
		text = text.replace(/([^\s.:!?()[\]{}<>"]+)/g,`<span class="float-up">$1</span>`)
		textnode.replaceWith(text)
	})
	this.find('span').each(function(i){
		setTimeout(() => {
			$(this).addClass('ready')
				$('.anim').addClass('ready')
		}, 100)
		$(this).css('transition-delay', i * 1.5 / 10 + 's')
		// $(this).addClass('ready')
	})
	return this
}

$(document).ready(function() {
	$('.text-to-span').wordify()
})
