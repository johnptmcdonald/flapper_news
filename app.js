angular
	.module("flapperNews", [])
	.controller("MainController", mainController);

	function mainController(){
		var self = this;
		self.message = "hello";
		self.addPost = addPost;

		self.posts = [
			{title: "post 1", upvotes: 3},
			{title: "post 2", upvotes: 1},
			{title: "post 3", upvotes: 7},
			{title: "post 4", upvotes: 4},
			{title: "post 5", upvotes: 3},
			{title: "post 6", upvotes: 8},
			{title: "post 7", upvotes: 12},
			{title: "post 8", upvotes: 10}
		];

		function addPost(text){
			console.log("addingPost")
			self.posts.push({title: text, upvotes: 0});
		}




	}