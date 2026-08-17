function ChildMedicalInfo({

    formData,

    handleChange,

    errors

}) {

    return (

        <>

            <h2 className="form-section-title">

                Medical Information

            </h2>

            <div className="form-group">

                <label>

                    Health Status

                </label>

                <input

                    type="text"

                    name="health"

                    value={formData.health}

                    onChange={handleChange}

                    placeholder="Healthy"

                />

                {errors?.health &&

                    <p className="error-text">

                        {errors.health}

                    </p>

                }

            </div>


            <div className="form-group">

                <label>

                    Child Description

                </label>

                <textarea

                    name="description"

                    rows="5"

                    value={formData.description}

                    onChange={handleChange}

                    placeholder="Write a short description about the child..."

                />

            </div>

        </>

    );

}

export default ChildMedicalInfo;