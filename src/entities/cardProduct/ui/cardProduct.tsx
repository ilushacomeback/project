import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLazy, Product } from '@/shared';

interface ProductProps {
  product: Product;
  isLast: boolean;
  AddProductButton: React.FC<{ id: number }>;
}

const Li = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  width: 250px;
  height: 400px;
  background: white;
`;

const Span = styled.span`
  font-weight: 800;
  font-size: 24px;
`;

export const CardProduct = ({
  product,
  isLast,
  AddProductButton,
}: ProductProps) => {
  const { name, price, image, id } = product;
  const trackedItem = useRef(null);
  const { lazy, optionsObserver } = useLazy();

  const observer = new IntersectionObserver(lazy, optionsObserver);

  useEffect(() => {
    if (trackedItem.current) {
      observer.observe(trackedItem.current);
    }
  }, []);

  return (
    <Li {...(isLast ? { ref: trackedItem } : {})}>
      <div>
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Span>{price}</Span>
        <AddProductButton id={id} />
      </div>
    </Li>
  );
};
