import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '@/context/CartContext';
import { ProductsProvider } from '@/context/ProductsContext';
import { Header } from '@/components/Header';
import Home from '@/app/[locale]/page';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn().mockReturnValue('/us'),
}));

import { mockProducts } from './__fixtures__/products'
import { fetchProducts } from '@/lib/api'

jest.mock('@/lib/api', () => ({
    fetchProducts: jest.fn(),
}));

beforeEach(() => {
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ success: true, products: [] }),
    });
});

const Providers = ({ children }: { children: React.ReactNode }) => (
    <ProductsProvider>
        <CartProvider>
            <Header />
            {children}
        </CartProvider>
    </ProductsProvider>
);

async function renderHome(locale = 'uk') {
    render(await Home({ params: { locale } }), { wrapper: Providers });
    await waitFor(() =>
        expect(screen.queryByText('Looking for more products...')).not.toBeInTheDocument()
    );
}

describe('Home - uk default', () => {
    it('renders an empty basket', async () => {
        await renderHome();

        const basketLink = screen.getByRole('link', {
            name: /Basket:/i,
        });

        expect(basketLink).toHaveTextContent('Basket: 0 items');
    });

    it('renders a basket with 1 item', async () => {
        const user = userEvent.setup();
        await renderHome();

        await user.click(screen.getByRole('button', {
            name: /Add Wireless Headsets to basket/i,
        }));

        expect(screen.getByRole('link', { name: /Basket:/i }))
            .toHaveTextContent(/Basket: 1 item$/);
    });

    it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
        const user = userEvent.setup();
        await renderHome();

        await user.click(screen.getByRole('button', { name: /Add Wireless Headsets to basket/i }));
        await user.click(screen.getByRole('button', { name: /Add Gaming Keyboard to basket/i }));
        await user.click(screen.getByRole('button', { name: /Add Gaming Keyboard to basket/i }));

        expect(screen.getByRole('link', { name: /Basket:/i }))
            .toHaveTextContent(/Basket: 3 items$/);
    });
});

describe('Home - us', () => {
    it('renders an empty basket', async () => {
        await renderHome('us');

        const basketLink = screen.getByRole('link', {
            name: /Basket:/i,
        });

        expect(basketLink).toHaveTextContent('Basket: 0 items');
    });

    it('renders a basket with 1 item', async () => {
        const user = userEvent.setup();
        await renderHome('us');

        await user.click(screen.getByRole('button', {
            name: /Add Wireless Headphones to basket/i,
        }));

        expect(screen.getByRole('link', { name: /Basket:/i }))
            .toHaveTextContent(/Basket: 1 item$/);
    });

    it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
        const user = userEvent.setup();
        await renderHome('us');

        await user.click(screen.getByRole('button', { name: /Add Wireless Headphones to basket/i }));
        await user.click(screen.getByRole('button', { name: /Add Mechanical Keyboard to basket/i }));
        await user.click(screen.getByRole('button', { name: /Add Mechanical Keyboard to basket/i }));

        expect(screen.getByRole('link', { name: /Basket:/i }))
            .toHaveTextContent(/Basket: 3 items$/);
    });
});
