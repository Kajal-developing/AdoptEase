function ChildBasicInfo({

    title,

    formData,

    handleChange,

    errors

}) {

    return (

        <>

            <div className="form-group">

                <label>

                    Child Name

                </label>

                <input

                    type="text"

                    name="name"

                    value={formData.name}

                    onChange={handleChange}

                    placeholder="Enter child name"

                />

                {errors?.name &&

                    <p className="error-text">

                        {errors.name}

                    </p>

                }

            </div>

            <div className="form-row">

                <div className="form-group">

                    <label>

                        Age

                    </label>

                    <input

                        type="number"

                        name="age"

                        value={formData.age}

                        onChange={handleChange}

                        placeholder="Age"

                    />

                    {errors?.age &&

                        <p className="error-text">

                            {errors.age}

                        </p>

                    }

                </div>

                <div className="form-group">

                    <label>

                        Gender

                    </label>

                    <select

                        name="gender"

                        value={formData.gender}

                        onChange={handleChange}

                    >

                        <option value="">

                            Select Gender

                        </option>

                        <option value="Male">

                            Male

                        </option>

                        <option value="Female">

                            Female

                        </option>

                    </select>

                    {errors?.gender &&

                        <p className="error-text">

                            {errors.gender}

                        </p>

                    }

                </div>

            </div>

            {title === "Edit Child" && (

                <div className="form-group">

                    <label>

                        Status

                    </label>

                    <select

                        name="status"

                        value={formData.status}

                        onChange={handleChange}

                    >

                        <option value="Available">

                            Available

                        </option>

                        <option value="Reserved">

                            Reserved

                        </option>

                        <option value="Adopted">

                            Adopted

                        </option>

                    </select>

                </div>

            )}

        </>

    );

}

export default ChildBasicInfo;