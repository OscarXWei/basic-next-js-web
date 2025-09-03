export default function ProductDetail({ params }) {
    return (
        <main style={{ padding: 20 }}>
            <h1>Product Detail</h1>
            <p>Product ID: {params.id}</p>
        </main>
    );
}
