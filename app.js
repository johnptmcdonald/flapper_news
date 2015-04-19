angular
	.module("flapperNews", ["ngAnimate", "ui.router"])
	.factory('postsFactory', postsFactory)
	.controller("MainController", mainController)
	.config(routeFunction)


	routeFunction.$inject = ['$stateProvider','$urlRouterProvider'];
	function routeFunction($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'home.html',
				controller: 'MainController as mainCtrl'
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

	function postsFactory(){
		return {
			posts: [
				{title: "post1", upvotes: 0, link: ""},
				{title: "post2", upvotes: 2, link: ""},
				{title: "post3", upvotes: 3, link: ""},
				{title: "post4", upvotes: 4, link: ""},
				{title: "post5", upvotes: 5, link: ""},
				{title: "post6", upvotes: 8, link: ""},
				{title: "post7", upvotes: 8, link: ""},
				{title: "post8", upvotes: 10, link: ""}
			]	
		}		
	}


