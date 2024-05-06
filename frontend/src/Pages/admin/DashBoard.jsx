import "./css/dashboard.css"


function DashBoard() {
    return (
        <div className="">

            <div className="row justify-center-around">
                <div className="col-4">
                    <div class="card">
                        <div class="card-header">
                            Not Logged Users
                        </div>
                        <div class="card-body">
                            <div className="row">
                                <div className="col"><h1 class=" text-primary">100</h1> </div>
                                <div className="col">icon here</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                


                <div className="col-4">
                    <div class="card">
                        <div class="card-header">
                            Not Logged Users
                        </div>
                        <div class="card-body">
                            <div className="row">
                                <div className="col"><h1 class=" text-primary">100</h1> </div>
                                <div className="col">icon here</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-4">
                    <div class="card">
                        <div class="card-header">
                            Not Logged Users
                        </div>
                        <div class="card-body">
                            <div className="row">
                                <div className="col"><h1 class=" text-primary">100</h1> </div>
                                <div className="col">icon here</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="card col-10">
                    <div class="card-header">
                        Registered  Candidates
                    </div>
                    <div className="card-body">
                        <table class="table  table-hover">
                            <thead class="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default DashBoard; 