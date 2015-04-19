angular
	.module("flapperNews", ["ngAnimate", "ui.router"])
	.factory('postsFactory', postsFactory)
	.controller("MainController", mainController)
	.controller("PostsController", postsController)
	.config(routeFunction)


	routeFunction.$inject = ['$stateProvider','$urlRouterProvider'];
	function routeFunction($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'home.html',
				controller: 'MainController as mainCtrl'
			})
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: 'posts.html',
				controller: 'PostsController as postsCtrl'
			});

		$urlRouterProvider.otherwise('home');
	}

	mainController.$inject = ['postsFactory'];
	function mainController(postsFactory){
		console.log('mainController is loading');
		var self = this;
		self.addPost = addPost;
		self.incrementUpvotes = incrementUpvotes;
		self.orderByUpvotes = orderByUpvotes;

		self.posts = postsFactory.posts;
		console.log(postsFactory);

		function addPost(post){
			console.log(post)

			if(post && post.title){
				console.log("addingPost")
				self.posts.unshift({title: post.title, upvotes: 0, link: post.link, comments: [
				    {author: 'Joe', body: 'Cool post!', upvotes: 0},
				    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				  ]});
				console.log(self.posts[0]);
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

	postsController.$inject = ['postsFactory', '$stateParams'];
	function postsController(postsFactory, $stateParams){
		console.log("postsController is loading");
		var self = this;

		self.post = postsFactory.posts[$stateParams.id];
		console.log(postsFactory.posts[$stateParams.id]);

		self.incrementUpvotes = incrementUpvotes;
		self.addComment = addComment;

		function addComment(){
			self.post.comments.unshift({body: self.body, author: 'A user', upvotes: 0});
			self.body = ""
		}

		function incrementUpvotes(comment){
			comment.upvotes++;
			console.log("incrementing upvotes")
		}
	}

	function postsFactory(){
		return {
			posts: [
				{title: "post1", upvotes: 0, link: "link1", comments: [
				    {author: 'Joe', body: 'Cool post!', upvotes: 0},
				    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				  ]},
				{title: "post2", upvotes: 2, link: "link2", comments: []},
				{title: "post3", upvotes: 3, link: "link3", comments: []},
				{title: "post4", upvotes: 4, link: "link4", comments: []},
				{title: "post5", upvotes: 5, link: "link5", comments: []},
				{title: "post6", upvotes: 8, link: "link6", comments: []},
				{title: "post7", upvotes: 8, link: "link7", comments: []},
				{title: "post8", upvotes: 10, link: "link8", comments: []}
			]	
		}		
	}


