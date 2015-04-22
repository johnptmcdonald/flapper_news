angular
	.module("flapperNews", ["ngAnimate", "ui.router"])
	.factory('postsFactory', postsFactory)
	.controller("MainController", mainController)
	.controller("PostsController", postsController)
	.config(routeFunction)

// ***********  CONFIG FOR UI-ROUTER **************************
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

// ***********  MAIN CONTROLLER ******************************
	mainController.$inject = ['postsFactory'];

	function mainController(postsFactory){
		console.log('mainController is loading');
		var self = this;
		self.addPost = addPost;
		self.incrementUpvotes = incrementUpvotes;
		self.orderByUpvotes = orderByUpvotes;
		
		postsFactory.getPosts()
			.then(function(data){
				self.posts = data
			})


		function addPost(post){
			if(post && post.title){
				console.log("addingPost")
				console.log(post)
				post.upvotes = 0;
				postsFactory.createPost(post)
					.then(function(){
					self.posts.unshift(post);
				})

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

// ***********  POSTS CONTROLLER ******************************
	postsController.$inject = ['postsFactory', '$stateParams'];

	function postsController(postsFactory, $stateParams){
		console.log("postsController is loading");
		var self = this;

		postsFactory.getPosts()
			.then(function(data){
				self.post = data[$stateParams.id]
			})

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


// ***********  POSTS FACTORY  ******************************
	postsFactory.$inject = ['$http'];

	function postsFactory($http){
		return {
			getPosts: getPosts,
			createPost: createPost
		}

		function getPosts(){
			return $http.get('/posts.json')
				.then(getPostsComplete)
				.catch(getPostsFailed);

				function getPostsComplete(response){
					console.log(response.data)
					return response.data
				}

				function getPostsFailed(error){
					console.log(error)
				}
		}

		function createPost(post){
			return $http.post('/posts.json', post)
				.then(createPostComplete)
				.catch(createPostFailed);

				function createPostComplete(response){
					console.log(response);
				};

				function createPostFailed(error){
					console.log(error);
				}
		}
	}

