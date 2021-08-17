<template>
  <div class="row clearfix">
    <!-- Widgets -->
    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div class="info-box bg-cyan hover-expand-effect">
            <div class="icon">
                <i class="material-icons">playlist_add_check</i>
            </div>
            <div class="content">
                <div class="text">Tổng thành viên</div>
                <div class="number">{{ totalRows }}</div>
            </div>
        </div>
    </div>

    <!-- #END# Widgets -->
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="card">
        <div class="header bg-light-blue">
          <h2>DANH SÁCH THÀNH VIÊN</h2>
          <button type="button" class="btn btn-success waves-effect" @click="sendEmailAddUser">Gửi mail kích hoạt</button>
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
              <b-form-group label-cols-sm="3" label="Sắp xếp" class="mb-0">
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

          <b-row>
            <b-col md="2" class="pull-right">
              <b-button size="lg" variant="success" @click="save" :disabled="processing">Save</b-button>
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
            fiexed
          >
            <template slot="avatar" slot-scope="row"><a :href="'https://facebook.com/profile.php?id=' + row.item.uid" target="_blank"><img :src="row.value ? row.value : '/img/no-image.png'" alt="" width="50"></a></template>
            <template slot="name" slot-scope="row"><a :href="'https://facebook.com/profile.php?id=' + row.item.uid" target="_blank">{{ row.value }}</a></template>

            <template slot="roles" slot-scope="row">
              <select class="form-control" @change="changeData($event, row.item.id, 'role')" style="width:100px">
                <option value="">None</option>
                <option v-for="(role, key) in roles" :value="role.id" :key="key" :selected="row.item.roles[0].id == role.id">
                  {{ role.name }}
                </option>
              </select>
            </template>

            <template slot="belongs" slot-scope="row">
              <div v-if="form[row.item.id] !== undefined && form[row.item.id].role !== undefined">
                <div v-if="[3, 5].includes(form[row.item.id].role)">
                  <div v-if="form[row.item.id].role != row.item.roles[0].id">
                    <b-form-input @change="changeData($event, row.item.id, 'company_name')"></b-form-input>
                  </div>
                  <div v-else>
                    <div v-if="row.item.group_companys === undefined || row.item.group_companys == null">
                      <b-form-input @change="changeData($event, row.item.id, 'company_name')"></b-form-input>
                    </div>
                    <div v-else>
                      <b-form-input :value="row.item.group_companys.group_name" @change="changeData($event, row.item.id, 'company_name')"></b-form-input>
                    </div>
                  </div>
                </div>

                <select v-else-if="[4, 6].includes(form[row.item.id].role)" @change="changeData($event, row.item.id, 'belongs_company')" class="form-control">
                  <option :value="0">----</option>
                  <option v-for="company in companies" :value="company.id" :key="company.id" :selected="form[row.item.id].belongs_company === company.id">{{ company.group_name }}</option>
                </select>
              </div>
              <div v-else>
                <div v-if="[3, 5].includes(row.item.roles[0].id)">
                  <div v-if="row.item.group_companys === undefined || row.item.group_companys == null">
                    <b-form-input @change="changeData($event, row.item.id, 'company_name')"></b-form-input>
                  </div>
                  <div v-else>
                    <b-form-input :value="row.item.group_companys.group_name" @change="changeData($event, row.item.id, 'company_name')"></b-form-input>
                  </div>
                </div>

                <select v-else-if="[4, 6].includes(row.item.roles[0].id)" @change="changeData($event, row.item.id, 'belongs_company')" class="form-control">
                  <option value="0">----</option>
                  <option v-for="company in companies" :value="company.id" :key="company.id" :selected="company.id === row.item.group_company_id">{{ company.group_name }}</option>
                </select>
              </div>
            </template>

            <template slot="group_limit" slot-scope="row">
              <div v-if="form[row.item.id] !== undefined && form[row.item.id].role !== undefined">
                <div v-if="[3, 5].includes(form[row.item.id].role)">
                  <div v-if="row.item.group_companys === undefined || row.item.group_companys == null">
                    <b-form-input @change="changeData($event, row.item.id, 'group_limit')" type="number"></b-form-input>
                  </div>
                  <div v-else>
                    <b-form-input :value="row.item.group_companys.group_limit" @change="changeData($event, row.item.id, 'group_limit')" type="number"></b-form-input>
                  </div>
                </div>
                <div v-if="[4, 6].includes(form[row.item.id].role) && form[row.item.id].belongs_company !== undefined">
                  {{ get_limit_company(form[row.item.id].belongs_company) }}
                </div>
              </div>
              <div v-else>
                <div v-if="[3, 5].includes(row.item.roles[0].id)">
                  <div v-if="row.item.group_companys === undefined || row.item.group_companys == null">
                    <b-form-input @change="changeData($event, row.item.id, 'group_limit')" type="number"></b-form-input>
                  </div>
                  <div v-else>
                    <b-form-input :value="row.item.group_companys.group_limit" @change="changeData($event, row.item.id, 'group_limit')" type="number"></b-form-input>
                  </div>
                </div>

                <div v-else-if="[4, 6].includes(row.item.roles[0].id)">
                  {{ row.item.group_companys.group_limit }}
                </div>
              </div>

            </template>

            <template slot="expired" slot-scope="row">
              <div v-if="form[row.item.id] !== undefined && form[row.item.id].role !== undefined">
                <div v-if="[4, 6, 7, 8].includes(form[row.item.id].role) == false">
                  <datepicker :value="row.value" format="dd/MM/yyyy" @input="changeData($event, row.item.id, 'expired')"></datepicker>
                </div>
                <div v-else-if="[4, 6].includes(form[row.item.id].role)">
                  {{ get_expired_company(form[row.item.id].belongs_company, 'company_id') }}
                </div>
              </div>

              <div v-else>
                <div v-if="[4, 6, 7, 8].includes(row.item.roles[0].id) == false">
                  <datepicker :value="row.value" format="dd/MM/yyyy" @input="changeData($event, row.item.id, 'expired')"></datepicker>
                </div>

                <div v-else-if="[4, 6].includes(row.item.roles[0].id)">
                  {{ get_expired_company(row.item.group_companys.admin_group_id, 'admin_group_id') }}
                </div>
              </div>
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

            <b-col md="2" class="pull-right">
              <b-button size="lg" variant="success" @click="save" :disabled="processing">Save</b-button>
            </b-col>
          </b-row>

        </div>
      </div>
    </div>
  </div>
</template>


<script>

import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      // List variables show data items
      items: [],
      roles: [],
      companies: [],
      expired: '',
      group_limit: '',

      // Form data change
      form: {},

      // Processing wait save
      processing: false,

      // Config items fields
      fields: [
        // {
        //   key: "id",
        //   lavel: 'ID',
        //   sortable: true,
        //   class: 'text-center'
        // },
        {
          key: "avatar",
          label: "Avatar",
          sortable: true,
          class: "text-center"
        },
        {
          key: "name",
          label: "Tên",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          class: "text-center"
        },
        {
          key: "phone",
          label: "Phone",
          sortable: true,
          class: "text-center"
        },
        { key: 'roles', label: 'Role' },
        { key: 'belongs', label: 'Nhóm/Công ty phụ thuộc' },
        { key: 'group_limit', label: 'Giới hạn số thành viên'},
        { key: 'expired', label: 'Hạn sử dụng'},
      ],
      currentPage: 1,
      perPage: 15,
      totalRows: (this.items) ? this.items.length : 0,
      pageOptions: [15, 50, 100],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      modalInfo: { title: "", content: "" }
    };
  },

  mounted() {
    this.getData();
  },

  watch: {

  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
  },

  methods: {
    // Load data
    getData() {
      axios.post('/admincp/list-active')
      .then(res => {
        const data = res.data;

        this.totalRows  = data.list.length + 1;
        this.items      = data.list;
        this.roles      = data.roles;
        this.companies  = data.companies;
      })
      .catch(error => {
          console.log(error);
      });
    },

    // Get change data
    changeData(event, user_id, type) {
      // Check form.user_id exist
      if (this.form[user_id] === undefined) {
        this.$set(this.form, user_id, {});
      }
// console.log(event);
      let val = '';
      if (type == 'belongs_company' || type == 'role') {
        val = parseInt(event.target.value);
      } else if ( type == 'company_name' || type == 'group_limit' ) {
        val = event;
      } else {
        val = event.target.value;
      }

      // Delete property with role (If role == [4, 6] => remove company_name, if role == [3, 5] => remove belongs_company)
      if (type == 'role') {
        if ([3, 5].includes(val)) {
          this.$delete(this.form[user_id], 'belongs_company')
        } else if ([4, 6].includes(val)) {
          this.$delete(this.form[user_id], 'company_name')
        }
      }

      // Set form
      let form = {...this.form[user_id], ...{[type]: val}};
      this.$set(this.form, user_id, form);
console.log(this.form);
    },

    // Get expired date of company or group
    get_expired_company(id, type) {
      if (id === undefined) {
        return;
      }

      axios.post('/admincp/get_expired_company', {'id': id, 'type': type})
        .then(res => {
          const data = res.data;
          this.expired = moment(data.expired).format('DD/MM/YYYY');
        })
        .catch(error => {
          console.log(error);
        });

      if (this.expired != '') {
        return this.expired;
      }
    },

    // Get member limit in company
    get_limit_company(company_id) {
      if (company_id === undefined) {
        return;
      }

      axios.post('/admincp/get_group_limit_company', {'id': company_id})
        .then(res => {
          const data = res.data;
          this.group_limit = parseInt(data.group_limit);
        })
        .catch(error => {
            console.log(error);
        });

      if (this.group_limit != '') {
        return this.group_limit;
      }
    },

    // Save data change
    save() {
      // Pause processing button
      this.processing = true;
      self = this;

      axios.post('/admincp/save-active', {data: this.form}).then(res => {
        const data = res.data;

        if (data.status == '200') {
          swal("Thành công!", "Chúc mừng bạn đã cập nhật thành công!.", "success");
        }


        this.processing = false;
      }).catch(error => {
        console.log(error);
        this.processing = false;
      });
    },

    sendEmailAddUser($event) {

      swal({
        text: 'Email',
        content: "input",
        button: {
          text: "Gửi!",
          closeModal: false,
        },
      }).then(name => {

        if (!name) throw null;

        axios.post('/admincp/sendEmailAddUser', {'name': name}).then(res => {
          const data = res.data;

          if (data.status == '200') {
            swal("Chúc mừng!", "Bạn đã thêm user thành công!", "success");
            setTimeout(function () {
                location.reload();
            }, 2000);
          }
        }).catch(error => {
          console.log(error);
        });

      }).catch(err => {
        if (err) {
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
    },

    // Filter table
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>