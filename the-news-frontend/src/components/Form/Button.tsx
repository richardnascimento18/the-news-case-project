function Button() {
  return (
    <button
      type="submit"
      className="px-(--padding-component-medium) py-(--padding-component-small) mt-(--margin-component-medium) bg-thenews-primary text-thenews-black rounded-(--rounding-radius) font-poppins text-(length:--font-size-medium) font-medium cursor-pointer self-center hover:bg-thenews-primary-250 hover:text-thenews-primary transition-all duration-500 ease-in-out"
    >
      enviar
    </button>
  );
}

export default Button;
