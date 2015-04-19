angular
	.module("flapperNews", ["ngAnimate"])
	.controller("MainController", mainController);

	function mainController(){
		var self = this;
		self.addPost = addPost;
		self.incrementUpvotes = incrementUpvotes;
		self.orderByUpvotes = orderByUpvotes;

		self.posts = [
			{title: "post1", upvotes: 0, link: ""},
			{title: "post2", upvotes: 2, link: ""},
			{title: "post3", upvotes: 3, link: ""},
			{title: "post4", upvotes: 4, link: ""},
			{title: "post5", upvotes: 5, link: ""},
			{title: "post6", upvotes: 8, link: ""},
			{title: "post7", upvotes: 8, link: ""},
			{title: "post8", upvotes: 10, link: ""}
			
		];

		function addPost(post){
			console.log(post)

			if(post && post.title){
				console.log("addingPost")
				self.posts.unshift({title: post.title, upvotes: 0, link: post.link});
				self.post = null;			
			}
		}

		function incrementUpvotes(post, index){
			post.upvotes++;
			self.orderByUpvotes();
		}


		function orderByUpvotes(){
			self.posts = self.posts.sort(function(obj1, obj2) {
				return obj1.upvotes - obj2.upvotes;
			});
		}
		

		
	}