import Head from 'next/head'
import CreateContestForm from '../components/CreateContestForm'

export default function createContest({ venues, today }) {

    return (

        <div className="container">

            <Head>

                <meta charSet="UTF-8" />

                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />

                <link href="./styles/global.css" rel="stylesheet" />
                <title>Create contest</title>

                <link rel="icon" href="/logo.ico" />

            </Head>

            <CreateContestForm venues={venues} rangeCompetitors={[1, 2, 3]} today={today} />

            <style>{`
        .form-title{
            font-weight: bold;
            margin: 20px 0px;
        }
        .add-venue-btn{
            margin: 20px;
        }
        .btn{
            margin-top: 30px;
            margin-right: 30px;
        }
        .btn-style2:disabled {
            cursor: not-allowed;
            pointer-events: all !important;
        }
        .error{
            background-color: #FFA901;
        }
        .success{
            background-color: #001A33;
        }
      `}</style>
        </div>
    )
}

createContest.getInitialProps = async () => {
    const response = await fetch('http://localhost:8080/venues')
    const venues = await response.json()
    const today =  new Date().toJSON().slice(0, 10)
    return { venues: venues, today: today }
}