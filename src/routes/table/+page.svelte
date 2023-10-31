<script lang="ts">
    import { Container, Table, TR, TD, TH, THead} from "$lib"
    let data = [
        {
            "name": "Miriam Allen",
            "phone": "1-643-496-8993",
            "email": "blandit.viverra.donec@aol.org",
            "country name": "Russian Federation"
        },
        {
            "name": "Shelly Kirby",
            "phone": "(576) 838-6621",
            "email": "eros.nec@hotmail.couk",
            "country name": "Costa Rica"
        },
        {
            "name": "Urielle Mcdowell",
            "phone": "1-577-374-7645",
            "email": "interdum@icloud.couk",
            "country name": "Colombia"
        },
        {
            "name": "Jackson Merritt",
            "phone": "(485) 828-9447",
            "email": "quis.diam.luctus@google.net",
            "country name": "Sweden"
        },
        {
            "name": "Axel Reilly",
            "phone": "(915) 708-5223",
            "email": "ut@icloud.net",
            "country name": "Ukraine"
        }
    ]
    let keys = ["name", "phone", "email", "country name"]
</script>

<Container>
    <Table {data} {keys} headers={keys} hover={true} animate="slow" stripe={true} border="none" />

    <div class="my-16"></div>

    <Table>
        <THead>
            <tr>
                <TH>Sl</TH>
                <TH>Name</TH>
                <TH>Roll</TH>
                <TH>Country</TH>
            </tr>
        </THead>
        <TR class="bg-red-100">
            <TD>TD</TD>
            <TD>TD</TD>
            <td>td</td>
            <td>td</td>
        </TR>
    </Table>
</Container>




