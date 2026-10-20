import DishCatalog from '@/app/menu/components/DishCatalog';
import { DietTag } from '@/common/enums/dish.enums';
import { dishes } from '@/common/lib/dishes';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

describe('DishCatalog', () => {
  it('renders every dish by default', () => {
    render(<DishCatalog />);

    expect(screen.getByText(`Nalezeno ${dishes.length} jídel`)).toBeDefined();
  });

  it('filters results by search query without a reload', async () => {
    render(<DishCatalog />);

    await userEvent.type(screen.getAllByLabelText('Hledat jídlo')[0], 'bibimbap');

    expect(screen.getByText('Nalezeno 1 jídel')).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Bibimbap' })).toBeDefined();
  });

  it('filters results by diet', async () => {
    render(<DishCatalog />);

    await userEvent.click(screen.getAllByRole('checkbox', { name: 'Veganské' })[0]);

    const expected = dishes.filter((d) => d.diets.includes(DietTag.VEGAN)).length;

    expect(screen.getByText(`Nalezeno ${expected} jídel`)).toBeDefined();
  });

  it('sorts dishes by price from the most expensive', async () => {
    render(<DishCatalog />);

    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Řazení' }), 'price-desc');

    const mostExpensive = [...dishes].sort((a, b) => b.priceCzk - a.priceCzk)[0];
    const firstCard = screen.getAllByRole('heading', { level: 3 })[0];

    expect(firstCard.textContent).toBe(mostExpensive.name);
  });

  it('shows an empty state when filters match nothing', async () => {
    render(<DishCatalog />);

    await userEvent.type(screen.getAllByLabelText('Hledat jídlo')[0], 'vrtulnik');

    expect(screen.getByText('Žádné jídlo neodpovídá zvoleným filtrům.')).toBeDefined();
  });

  it('switches between the grid and the list view', async () => {
    render(<DishCatalog />);

    const list = screen.getByRole('button', { name: 'Seznam' });
    const grid = screen.getByRole('button', { name: 'Mřížka' });

    expect(grid.getAttribute('aria-pressed')).toBe('true');

    await userEvent.click(list);

    expect(list.getAttribute('aria-pressed')).toBe('true');
    expect(grid.getAttribute('aria-pressed')).toBe('false');
  });
});
