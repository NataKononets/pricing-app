import { useState } from "react";

export default function PricingBuilder() {

    const [form, setForm] = useState({
        title: "",
        price: "",
        users: "",
        storage: "",
        helpCenter: true,
        featured: false,
    });
    const [plans, setPlans] = useState([]);
    const [errors, setErrors] = useState({});


    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }

    function validate() {
        const e = {};
        const priceNum = Number(form.price);
        const usersNum = Number(form.users);
        const storageNum = Number(form.storage);

        if (!form.title.trim()) e.title = "Додайте назву (Free/Pro/Enterprise…)";
        if (form.price === "") e.price = "Вкажіть ціну";
        if (isNaN(priceNum) || priceNum < 0) e.price = "Ціна має бути ≥ 0";
        if (form.users === "") e.users = "Вкажіть к-сть юзерів";
        if (!Number.isInteger(usersNum) || usersNum <= 0) e.users = "К-сть юзерів > 0";
        if (form.storage === "") e.storage = "Вкажіть обсяг (GB)";
        if (isNaN(storageNum) || storageNum <= 0) e.storage = "Обсяг має бути > 0";

        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        const newPlan = {
            id: crypto.randomUUID(),
            title: form.title.trim(),
            price: Number(form.price),
            users: Number(form.users),
            storage: Number(form.storage),
            helpCenter: Boolean(form.helpCenter),
            featured: Boolean(form.featured),
        };
        setPlans((prev) => [newPlan, ...prev]);
        setForm({
            title: "",
            price: "",
            users: "",
            storage: "",
            helpCenter: true,
            featured: false,
        });
        setErrors({});
    }

    function removePlan(id) {
        setPlans((prev) => prev.filter((p) => p.id !== id));
    }
    function addPlan(preset) {
        const plan = { id: crypto.randomUUID(), ...preset };
        setPlans(prev => [plan, ...prev]);
    }

    return (
        <div className="container py-4 py-md-5">
            <div className="text-center mb-4">
                <p className="text-uppercase text-primary fw-semibold mb-1">Plans</p>
                <h1 className="display-5 fw-bold">Pricing</h1>
                <p className="text-muted">
                    Швидко зберіть ефективну таблицю тарифів на Bootstrap.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white border rounded-4 p-3 p-md-4 shadow-sm mb-4"
            >
                <div className="row g-3 align-items-end">
                    <div className="col-12 col-md-3">
                        <label className="form-label">Назва тарифу</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            type="text"
                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                            placeholder="Free / Pro / Enterprise"
                        />
                        {errors.title && (
                            <div className="invalid-feedback d-block">{errors.title}</div>
                        )}
                    </div>

                    <div className="col-12 col-md-3">
                        <label className="form-label">Ціна</label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                type="number"
                                min="0"
                                step="0.01"
                                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                placeholder="0"
                            />
                            <span className="input-group-text">/mo</span>
                            {errors.price && (
                                <div className="invalid-feedback">{errors.price}</div>
                            )}
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                        <label className="form-label">К-сть юзерів</label>
                        <input
                            name="users"
                            value={form.users}
                            onChange={handleChange}
                            type="number"
                            min="1"
                            step="1"
                            className={`form-control ${errors.users ? "is-invalid" : ""}`}
                            placeholder="10"
                        />
                        {errors.users && (
                            <div className="invalid-feedback d-block">{errors.users}</div>
                        )}
                    </div>

                    <div className="col-12 col-md-2">
                        <label className="form-label">Обсяг (GB)</label>
                        <input
                            name="storage"
                            value={form.storage}
                            onChange={handleChange}
                            type="number"
                            min="1"
                            step="1"
                            className={`form-control ${errors.storage ? "is-invalid" : ""}`}
                            placeholder="5"
                        />
                        {errors.storage && (
                            <div className="invalid-feedback d-block">{errors.storage}</div>
                        )}
                    </div>

                    <div className="col-6 col-md-1">
                        <div className="form-check mt-4">
                            <input
                                id="helpCenter"
                                name="helpCenter"
                                checked={form.helpCenter}
                                onChange={handleChange}
                                type="checkbox"
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="helpCenter">
                                Help
                            </label>
                        </div>
                    </div>

                    <div className="col-6 col-md-1">
                        <div className="form-check mt-4">
                            <input
                                id="featured"
                                name="featured"
                                checked={form.featured}
                                onChange={handleChange}
                                type="checkbox"
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="featured">
                                Featured
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-md-12 col-lg-2 d-grid">
                        <button type="submit" className="btn btn-primary">
                            Додати
                        </button>
                    </div>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                                addPlan({ title: "Free", price: 0, users: 10, storage: 2, helpCenter: true, featured: false })
                            }
                        >
                            + Add Free
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                                addPlan({ title: "Pro", price: 15, users: 20, storage: 10, helpCenter: true, featured: false })
                            }
                        >
                            + Add Pro
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                                addPlan({ title: "Enterprise", price: 29, users: 30, storage: 15, helpCenter: true, featured: true })
                            }
                        >
                            + Add Enterprise
                        </button>
                    </div>
                </div>
            </form>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {plans.length === 0 && (
                    <div className="col">
                        <div className="alert alert-secondary" role="alert">
                            Немає жодної карти — додайте першу зверху.
                        </div>
                    </div>
                )}

                {plans.map((p) => (
                    <div className="col" key={p.id}>
                        <div
                            className={`card h-100 rounded-4 ${p.featured ? "shadow-lg border-primary" : "shadow-sm"
                                }`}
                        >
                            <div
                                className={`card-header py-3 d-flex align-items-center justify-content-between ${p.featured ? "text-bg-primary border-primary" : "bg-white"
                                    }`}
                            >
                                <h4
                                    className={`my-0 fw-semibold ${p.featured ? "text-white" : ""
                                        }`}
                                >
                                    {p.title}
                                </h4>
                                {p.featured && (
                                    <span className="badge bg-light text-primary">
                                        Most popular
                                    </span>
                                )}
                            </div>

                            <div className="card-body d-flex flex-column">
                                <h1 className="card-title display-6 fw-bold mb-3">
                                    ${p.price}
                                    <small className="text-body-secondary fw-light">/mo</small>
                                </h1>
                                <ul className="list-unstyled text-muted mb-4 small">
                                    <li className="mb-1">{p.users} users included</li>
                                    <li className="mb-1">{p.storage} GB of storage</li>
                                    <li className="mb-1">
                                        {p.helpCenter ? "Help center access" : "No help center"}
                                    </li>
                                </ul>
                                <div className="mt-auto d-grid gap-2">
                                    <button
                                        className={`btn btn-lg ${p.featured ? "btn-light" : "btn-primary"
                                            }`}
                                        type="button"
                                    >
                                        Get started
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => removePlan(p.id)}
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="my-5" />
            <div className="row text-muted small g-4">
                <div className="col-6 col-md-3">
                    <p className="mb-2 fw-semibold">Features</p>
                    <ul className="list-unstyled">
                        <li>Cool stuff</li>
                        <li>Random feature</li>
                        <li>Team feature</li>
                        <li>Developers</li>
                    </ul>
                </div>
                <div className="col-6 col-md-3">
                    <p className="mb-2 fw-semibold">Resources</p>
                    <ul className="list-unstyled">
                        <li>Docs</li>
                        <li>Guides</li>
                        <li>Support</li>
                    </ul>
                </div>
                <div className="col-6 col-md-3">
                    <p className="mb-2 fw-semibold">About</p>
                    <ul className="list-unstyled">
                        <li>Team</li>
                        <li>Locations</li>
                        <li>Privacy</li>
                        <li>Terms</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}