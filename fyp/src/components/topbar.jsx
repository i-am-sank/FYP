import { Statistic, Button } from 'semantic-ui-react';

const Topbar = () => {
    return (
        <div className='topbar'>
            <div className='statistic'>
                <Statistic>
                    <Statistic.Value>PEB</Statistic.Value>
                    <Statistic.Label>Pre Elec Board</Statistic.Label>
                </Statistic>
            </div>
            <div>
                <Button>
                    unlock wallet
                </Button>
            </div>
        </div>
    )
}

export default Topbar;