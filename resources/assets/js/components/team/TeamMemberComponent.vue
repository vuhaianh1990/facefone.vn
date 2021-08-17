<template>
  <div class="row clearfix">
    <!-- Widgets -->
    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div class="info-box bg-pink hover-expand-effect">
            <div class="icon">
                <i class="material-icons">playlist_add_check</i>
            </div>
            <div class="content">
                <div class="text">Tổng nhóm (đội)</div>
                <div class="number">{{ totalRows }}</div>
            </div>
        </div>
    </div>

    <!-- <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div class="info-box bg-green hover-expand-effect">
            <div class="icon">
                <i class="material-icons">person_add</i>
            </div>
            <div class="content">
                <div class="text">Chủ doanh nghiệp</div>
                <div class="number">{{ admin_name }}</div>
            </div>
        </div>
    </div>

    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div class="info-box bg-cyan hover-expand-effect">
            <div class="icon">
                <i class="material-icons">playlist_add_check</i>
            </div>
            <div class="content">
                <div class="text">Tổng thành viên</div>
                <div class="number">{{ totalUser }}</div>
            </div>
        </div>
    </div> -->

    <!-- #END# Widgets -->
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="header bg-light-blue">
          <h2>DANH SÁCH NHÓM (ĐỘI)</h2>
        </div>
        <div class="body">
          <!-- User Interface controls -->
          <b-row class="frm-filter">
            <b-col md="5" class="frm-vue">
              <b-form-group label-cols-sm="2" label="Tìm kiếm" class="mb-0">
                <b-input-group>
                  <input type="text" v-model="filter" placeholder="Type to Search">
                  <button :disabled="!filter" @click="filter = ''">Clear</button>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="4" class="frm-vue">
              <b-form-group label-cols-sm="2" label="Sắp xếp" class="mb-0">
                <b-input-group>
                  <b-form-select v-model="sortBy" :options="sortOptions">
                    <option slot="first" :value="null" selected>-- none --</option>
                  </b-form-select>
                  <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
                    <option :value="false">Asc</option> <option :value="true">Desc</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>


            <b-col md="3" class="frm-vue">
              <b-form-group label-cols-sm="3" label="Số dòng" class="mb-0">
                <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <!-- Main table element -->
          <b-table
            show-empty
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            bordered
            responsive
            fixed
            striped
            foot-clone
            hover
            head-variant="dark"
          >
            <template slot="team_name" slot-scope="row">{{ row.value ? row.value : "Nhóm " + row.item.id }}</template>
            <template slot="admin_team_name" slot-scope="row">{{ row.item.admin_team.name }}</template>

            <template slot="actions" slot-scope="row">
              <b-button size="sm" @click="row.toggleDetails" variant="info">
                {{ row.detailsShowing ? 'Ẩn' : 'Hiện' }} chi tiết
              </b-button>

              <b-button size="sm" @click="info(row.item, row.index, $event.target)" variant="success">
                Thêm thành viên
              </b-button>

              <b-button size="sm" @click="info(row.item, row.index, $event.target)" variant="danger">
                Xoá nhóm
              </b-button>
            </template>

            <!-- Detail -->
            <template slot="row-details" slot-scope="row">
              <b-table bordered responsive fixed striped dark
                :items="row.item.users"
                :fields="fieldsDetail"
              >
                <template slot="avatar" slot-scope="detailRow"><a :href="'list-scan/' + row.item.id" target="_blank"><img :src="detailRow.value" alt=""></a></template>
              </b-table>
            </template>

          </b-table>

          <b-row>
            <b-col md="6" class="frm-vue">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                class="my-0"></b-pagination>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const items = [];

export default {
  data() {
    return {
      items: items,
      fieldsDetail: [
        'avatar', 'name', 'email', 'phone'
      ],
      fields: [
        {
          key: "team_name",
          label: "Tên",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "admin_team_name",
          label: "Quản trị nhóm",
          sortable: true,
          class: "text-center"
        },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
    };
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  methods: {
    fetchPosts() {
      axios.post('/admincp/team_member')
      .then(res => {
        let data = res.data.list;

        this.totalRows  = data.length;
        this.items      = data;

      })
      .catch(error => {
          console.log(error.res.data);
      });
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>