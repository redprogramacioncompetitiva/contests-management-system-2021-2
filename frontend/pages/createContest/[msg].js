import { useRouter } from 'next/router'
import CreateContestForm from '../../components/CreateContestForm'
import Head from 'next/head'

export default function createContest({ venues }) {

    const router = useRouter()
    let message = ''
    let className = 'card p-3 w-50 shadow text-white w-auto text-center mt-3'

    switch (router.query.msg) {
        case 'msg1':
            message = 'contest already created!'
            className += ' error'
            break
        case 'msg2':
            message = 'contest created successfully!'
            className += ' success'
            break
    }

    return (

        <div className="container">

            <Head>

                <meta charSet="UTF-8" />

                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />

                <title>Create contest</title>

                <link rel="icon" href="/logo.ico" />

            </Head>

            <CreateContestForm venues={venues} message={message} className={className}/>

              <style>{`
               .form-title{
                    font-weight: bold;
                    margin: 20px 0px;
                }
                .add-venue-btn{
                    margin-top: 20px;
                }
                .btn{
                    margin-top: 30px;
                    margin-right: 30px;
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
    return { venues: venues }
}
