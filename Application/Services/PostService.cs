﻿using Application.Interfaces;
using Application.Models;
using Application.Validation;

namespace Application.Services
{
    public class PostService : IPostService
    {
        readonly IUnitOfWork unitOfWork;

        readonly IMap map;

        public PostService(IUnitOfWork unitOfWork, IMap map)
        {
            this.unitOfWork = unitOfWork;

            this.map = map;
        }

        public async Task AddAsync(PostModel model)
        {
            ValidationPost(model);

            var post = map.Convert<Post, PostModel>(model);

            await unitOfWork.PostRepository.AddAsync(post);

            await unitOfWork.SaveAsync();
        }

        public async Task AddCommentAsync(CommentModel commentModel)
        {
            ValidationComment(commentModel);

            var comment = map.Convert<Comment, CommentModel>(commentModel);

            await unitOfWork.CommentRepository.AddAsync(comment);

            await unitOfWork.SaveAsync();
        }

        public async Task DeleteAsync(int modelId)
        {
            await unitOfWork.PostRepository.DeleteByIdAsync(modelId);

            await unitOfWork.SaveAsync();
        }

        public async Task<IEnumerable<PostModel>> GetAllAsync()
        {
            var list = await unitOfWork.PostRepository.GetAllWithDetailsAsync();

            return map.Convert<IEnumerable<PostModel>, IEnumerable<Post>>(list);
        }

        public async Task<IEnumerable<CommentModel>> GetAllPostCommentAsync(int postModelId)
        {
            var list = (await unitOfWork
                .PostRepository
                .GetByIdWithDetailsAsync(postModelId))
                .Comments;

            return map.Convert<IEnumerable<CommentModel>, IEnumerable<Comment>>(list);
        }

        public async Task<PostModel> GetByIdAsync(int id)
        {
            var post = await unitOfWork.PostRepository.GetByIdWithDetailsAsync(id);

            return map.Convert<PostModel, Post>(post);
        }

        public async Task<IEnumerable<PostModel>> GetPostsByPeriodAsync(DateTime startDate, DateTime endDate)
        {
            var list = (await unitOfWork
                .PostRepository
                .GetAllWithDetailsAsync())
                .Where(t => t.DateCreated >= startDate && t.DateCreated <= endDate);

            return map.Convert<IEnumerable<PostModel>, IEnumerable<Post>>(list);

        }

        public async Task RemoveCommentAsync(int commentModelId)
        {
            await unitOfWork.CommentRepository.DeleteByIdAsync(commentModelId);

            await unitOfWork.SaveAsync();
        }

        public async Task UpdateAsync(PostModel model)
        {
            ValidationPost(model);

            var post = map.Convert<Post, PostModel>(model);

            unitOfWork.PostRepository.Update(post);

            await unitOfWork.SaveAsync();
        }

        public async Task UpdateCommentAsync(CommentModel commentModel)
        {
            ValidationComment(commentModel);

            var comment = map.Convert<Comment, CommentModel>(commentModel);

            unitOfWork.CommentRepository.Update(comment);

            await unitOfWork.SaveAsync();
        }

        static void ValidationPost(PostModel model)
        {
            if (model is null)
                throw new BlogException("Model is null.");

            if (model.Title == string.Empty || model.Content == string.Empty)
                throw new BlogException("Title or Content is empty.");
        }

        static void ValidationComment(CommentModel model)
        {
            if (model is null)
                throw new BlogException("Model is null.");

            if (model.Content == string.Empty)
                throw new BlogException("Content is empty");
        }
    }
}
