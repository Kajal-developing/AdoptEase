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

            <div className="form-row">

                <div className="form-group">

                    <label>

                        Blood Group

                    </label>

                    <select

                        name="bloodGroup"

                        value={formData.bloodGroup || ""}

                        onChange={handleChange}

                    >

                        <option value="">

                            Select Blood Group

                        </option>

                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>

                    </select>

                </div>

                <div className="form-group">

                    <label>

                        Medical Condition

                    </label>

                    <input

                        type="text"

                        name="medicalCondition"

                        value={formData.medicalCondition || ""}

                        onChange={handleChange}

                        placeholder="Asthma / None"

                    />

                </div>

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