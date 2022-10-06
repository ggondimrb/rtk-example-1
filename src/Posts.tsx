import { PostType, useAddPostMutation, useGetPostsQuery, useRemovePostMutation, useUpdatePostMutation } from "./api/serverApi"
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

type Inputs = {
  title: string,
  author: string,
}

export function Posts() {
  const { data, isLoading } = useGetPostsQuery();
  const [addPost, { isLoading: isLoadingAddPost }] = useAddPostMutation()
  const [updatePost, { isLoading: isLoadingUpdatePost }] = useUpdatePostMutation()
  const [removePost, { isLoading: isLoadingRemovePost, isSuccess: isSucessRemovePost }] = useRemovePostMutation()

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    addPost({ ...data, id: Math.floor(Math.random() * 100), checked: false });
    reset();
  }

  function handleUpdatePost(item: PostType) {
    updatePost({ ...item, checked: !item.checked })
  }

  function handleRemovePost(id: number) {
    removePost(id);
  }

  useEffect(() => {
    if (isSucessRemovePost) {
      alert('Removido com sucesso');
    }
  }, [isSucessRemovePost]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>Titulo</span>
          <input {...register("title")} />
          <span>Autor</span>
          <input {...register("author")} />
          <button type="submit">{isLoadingAddPost ? 'criando...' : 'criar'}</button>
        </form>
      </div>
      {isLoading ?
        <h1>Carregando...</h1>
        :
        <ul>
          {isLoadingUpdatePost && 'Atualizando...'}
          {isLoadingRemovePost && 'Removendo...'}
          {data?.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <br />
              <span>{item.author}</span>
              <br />
              <input
                defaultChecked={item.checked}
                type="checkbox"
                onClick={() => handleUpdatePost(item)}
              />
              <button onClick={() => handleRemovePost(item.id)}>Remover</button>
            </li>
          ))}
        </ul>}
    </>
  )
}